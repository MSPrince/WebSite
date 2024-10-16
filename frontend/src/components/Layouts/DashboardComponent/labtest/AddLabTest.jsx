import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../../store/auth";
import EditorJs from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Quote from "@editorjs/quote";
import SimpleImage from "@editorjs/simple-image";
import Table from "@editorjs/table";
import Embed from "@editorjs/embed";
import NestedList from "@editorjs/nested-list";
import { usePostLabTestMutation } from "../../../../redux/features/labtest/labTestApi";

function AddLabTest() {
  const editorRef = useRef(null);
  const [testName, setTestName] = useState("");
  const [testDescription, setTestDescription] = useState("");
  const [realPrice, setRealPrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [sampleType, setSampleType] = useState("");
  const [specialInstruction, setSpecialInstruction] = useState("");
  const [testCoverImg, setTestCoverImg] = useState("");
  const [testCategory, setTestCategory] = useState("");
  const [tat, setTat] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const [postLabTest] = usePostLabTestMutation();
  const { user } = useAuth();

  useEffect(() => {
    const editor = new EditorJs({
      holder: "editorjs",
      onReady: () => {
        editorRef.current = editor;
      },
      autofocus: true,
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
          config: {
            placeholder: "Enter a header",
            levels: [2, 3, 4],
            defaultLevel: 3,
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        nestedList: {
          class: NestedList,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+O",
          config: {
            quotePlaceholder: "Enter a quote",
            captionPlaceholder: "Quote's author",
          },
        },
        image: {
          class: SimpleImage,
          inlineToolbar: true,
        },
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3,
          },
        },
        embed: {
          class: Embed,
          inlineToolbar: false,
          config: {
            services: {
              youtube: true,
              coub: true,
            },
          },
        },
      },
    });

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const includeTest = await editorRef.current.save();
      console.log(includeTest);

      const newLabtest = {
        testName,
        testDescription,
        realprice: parseFloat(realPrice), // Ensure correct casing
        mrp: parseFloat(mrp),
        sampleType,
        specialInstruction,
        testCoverImg,
        testCategory,
        includeTest,
        tat,
      };

      console.log("New lab test data being sent:", newLabtest);

      // Assuming you have the token
      const token = localStorage.getItem("token"); // Or however you're storing the token

      const response = await fetch(
        "https://doctors-diary-backend.onrender.com/api/labtest/lab-test/createLabtest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newLabtest),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error data from server:", errorData);
        throw new Error(
          `Error: ${errorData.message || "Failed to create lab test"}`
        );
      }

      const data = await response.json();
      console.log("Lab test created successfully:", data);
      toast.success("Lab test added successfully!");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error while creating lab test:", error.message);
      setMessage("Failed to submit post, please try again.");
      toast.error("Failed to add lab test, please try again!");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-7 py-8 bg-gray-50 rounded-lg shadow-lg">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Create a Lab Test</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <label htmlFor="testName" className="font-semibold text-md">
              Test Name
            </label>
            <input
              type="text"
              id="testName"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              placeholder="Enter your Test Name"
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-2/3 bg-gray-100 p-4 rounded-lg shadow-md">
              <p>Write the test details below</p>
              <div className="space-y-5" id="editorjs"></div>
            </div>

            <div className="w-full md:w-1/3 bg-gray-200 p-4 rounded-lg shadow-md">
              <div className="space-y-3">
                <label htmlFor="testCoverImg" className="font-semibold text-md">
                  Test Image
                </label>
                <input
                  type="text"
                  id="testCoverImg"
                  value={testCoverImg}
                  onChange={(e) => setTestCoverImg(e.target.value)}
                  placeholder="Enter the cover image URL"
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="space-y-3 mt-4">
                <label htmlFor="testCategory" className="font-semibold text-md">
                  Test Category
                </label>
                <input
                  type="text"
                  id="testCategory"
                  value={testCategory}
                  onChange={(e) => setTestCategory(e.target.value)}
                  placeholder="Enter test category"
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="realPrice" className="font-semibold text-md">
                  Real Price
                </label>
                <input
                  type="number"
                  id="realPrice"
                  value={realPrice}
                  onChange={(e) => setRealPrice(e.target.value)}
                  placeholder="Enter the Real Price"
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="mrp" className="font-semibold text-md">
                  MRP
                </label>
                <input
                  type="number"
                  id="mrp"
                  value={mrp}
                  onChange={(e) => setMrp(e.target.value)}
                  placeholder="Enter the MRP"
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="space-y-3 mt-4">
                <label
                  htmlFor="testDescription"
                  className="font-semibold text-md"
                >
                  Test Description
                </label>
                <textarea
                  id="testDescription"
                  value={testDescription}
                  onChange={(e) => setTestDescription(e.target.value)}
                  placeholder="Enter the test description"
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="space-y-3 mt-4">
                <label
                  htmlFor="testDescription"
                  className="font-semibold text-md"
                >
                  TAT - Report Timing
                </label>
                <input
                  type="text"
                  id="testDescription"
                  value={tat}
                  onChange={(e) => setTat(e.target.value)}
                  placeholder="Enter the test description"
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="space-y-3 mt-4">
                <label htmlFor="sampleType" className="font-semibold text-md">
                  Sample Type
                </label>
                <input
                  type="text"
                  id="sampleType"
                  value={sampleType}
                  onChange={(e) => setSampleType(e.target.value)}
                  placeholder="Enter the sample type"
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="space-y-3 mt-4">
                <label
                  htmlFor="specialInstruction"
                  className="font-semibold text-md"
                >
                  Special Instruction
                </label>
                <input
                  type="text"
                  id="specialInstruction"
                  value={specialInstruction}
                  onChange={(e) => setSpecialInstruction(e.target.value)}
                  placeholder="Enter special instructions"
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {message && <p className="text-red-500">{message}</p>}
          <button
            type="submit"
            className="w-full Button text-white font-semibold py-3 rounded-lg"
          >
            Add Test
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddLabTest;
