const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51Q5RmDSD4ZdIeMfMbDebRJj1RctBTrEzUEuvbYF6gOv2LmD6HDhSBnZ9LhScbDPDce2Z9DDt5FPoTV8h7RYuGPSI000eKZEKQF"
);
const Order = require("../order/order.model"); // Ensure this model is correctly set up

const authMiddleware = require("../../middleware/authMiddleware.js");
const adminMiddleware = require("../../middleware/adminMiddleware.js");
const { sendMail } = require("../../helper/sendMail.js");



// Create a checkout session
router.post("/create-checkout-session", async (req, res) => {
  const { products } = req.body;

  try {
    // Map products to Stripe's line_items format
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          images: [product.image],
        },
        unit_amount: Math.round(product.price * 1), // Convert to cents
      },
      quantity: product.quantity,
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `https://frontt-pmpw.onrender.com/success?session_id={CHECKOUT_SESSION_ID}`, // Use Stripe's default replacement tag
      cancel_url: `https://frontt-pmpw.onrender.com/cancel`,
    });

    // Return session ID to frontend
    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Confirm payment and create order
//  confirm payment

router.post("/confirm-payment", async (req, res) => {
  const { session_id } = req.body;

  try {
    // Retrieve the session details from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "payment_intent"],
    });

    const paymentIntentId = session.payment_intent.id;
    const customerEmail = session.customer_details.email; // Get the email from the session
    const username = session.customer_details.name || "Customer"; // Fallback name if not provided

    // Check if the order already exists
    let order = await Order.findOne({ orderId: paymentIntentId });

    if (!order) {
      const lineItems = session.line_items.data.map((item) => ({
        productId: item.price.product,
        quantity: item.quantity,
        productName: item.description || item.price_data.product_data.name,
      }));

      const amount = session.amount_total / 100;

      order = new Order({
        orderId: paymentIntentId,
        products: lineItems,
        amount: amount,
        email: customerEmail,
        status:
          session.payment_intent.status === "succeeded" ? "pending" : "failed",
      });
    } else {
      // Update existing order with the latest status
      order.status =
        session.payment_intent.status === "succeeded" ? "pending" : "failed";
      // Optionally update products if necessary
      order.products = lineItems; // Optional: update products if needed
    }

    // Save the order to MongoDB
    await order.save();

    // Send a welcome email
  sendMail(
    customerEmail,
    "Thank You for Your Purchase!",
    `Subject: Thank You for Your Purchase!

Hi ${username},

Thank you for your recent purchase from Doctor's Diary Pvt Ltd! We are thrilled to have you with us and look forward to serving your health and wellness needs.

### Your Order Details:
${order.products
  .map(
    (product) => `- **${product.productName}** (Quantity: ${product.quantity})`
  )
  .join("\n")}

With Doctor's Diary, you can easily:
- **Book blood tests** for free home sample collection.
- **Consult with top doctors** online, anytime.
- **Order Allopathic & Ayurvedic medicines** from the comfort of your home, with a speedy 2-hour delivery option.

If you have any questions or need assistance, please don’t hesitate to reach out to our support team. We're here to help!

Once again, welcome to the Doctor's Diary family!

Best regards,

The Doctor's Diary Team  
+91-9598149103  
+91-7897173138`
  );


    // Respond with the saved order
    res.json({ order });
  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).json({ error: "Failed to confirm payment" });
  }
});




// get order by email address
router.get("/:email", async (req, res) => {
  const email = req.params.email;
  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

  try {
    const orders = await Order.find({ email: email });

    if (orders.length === 0 || !orders) {
      return res
        .status(400)
        .send({ orders: 0, message: "No orders found for this email" });
    }
    res.status(200).send({ orders });
  } catch (error) {
    console.error("Error fetching orders by email", error);
    res.status(500).send({ message: "Failed to fetch orders by email" });
  }
});


// get order by id
router.get("/order/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }
    res.status(200).send(order);
  } catch (error) {
    console.error("Error fetching orders by user id", error);
    res.status(500).send({ message: "Failed to fetch orders by user id" });
  }
});


// get all orders
router.get("/",  async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    if (orders.length === 0) {
      return res.status(404).send({ message: "No orders found", orders: [] });
    }

    res.status(200).send(orders);
  } catch (error) {
    console.error("Error fetching all orders", error);
    res.status(500).send({ message: "Failed to fetch all orders" });
  }
});


// update order status
router.patch("/update-order-status/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) {
    return res.status(400).send({ message: "Status is required" });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        status,
        updatedAt: new Date(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if(!updatedOrder) {
      return res.status(404).send({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder
    })

  } catch (error) {
    console.error("Error updating order status", error);
    res.status(500).send({ message: "Failed to update order status" });
  }
});

// delete order
router.delete('/delete-order/:id', async( req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).send({ message: "Order not found" });
    }
    res.status(200).json({
      message: "Order deleted successfully",
      order: deletedOrder
    })
    
  } catch (error) {
    console.error("Error deleting order", error);
    res.status(500).send({ message: "Failed to delete order" });
  }
} )


module.exports = router;