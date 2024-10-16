// Import editorjs-html
import EditorJsToHtml from "editorjs-html";

// Inside your component (e.g., AddPost), initialize the parser
const edjsParser = EditorJsToHtml();

const handleSubmit = async (e) => {
  e.preventDefault();

  // Ensure the editor instance exists
  if (!editorRef.current) return;

  try {
    // Get content from EditorJs
    const content = await editorRef.current.save();

    // Convert content blocks to HTML using editorjs-html
    const parsedContent = edjsParser.parse(content);
    const htmlContent = parsedContent.join(""); // Join array elements to form a complete HTML string

    // Create a new post object with the converted HTML content
    const newPost = {
      title,
      coverImg,
      description: metaDescription,
      category,
      rating,
      author: user?._id,
      content: htmlContent, // Using the parsed HTML content
    };

    // Submit the post (e.g., to your API)
    const response = await postBlog(newPost).unwrap();
    toast.success("Blog Post added successfully!");
    navigate("/blogs");
  } catch (error) {
    console.error(error);
    setMessage("Failed to submit Post, try again");
  }
};
