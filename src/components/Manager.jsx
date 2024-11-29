import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import Delete from "./Delete";
import eye from "../images/eye.svg"
import eyecross from "../images/eyecross.svg"

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);
  const [showDeletepopup, setshowDeletepopup] = useState(false);
  const [passwordToDelete, setpasswordToDelete] = useState(null);
  const [editingPasswordid, seteditingPasswordid] = useState(null);
  const [isDeleting, setisDeleting] = useState(false)

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    // alert("Show the Password")
    if (ref.current.src.includes(eye)) {
      ref.current.src = eyecross;
      passwordRef.current.type = "password";
    } else {
      ref.current.src = eye;
      passwordRef.current.type = "text";
    }
  };

  const savePassword = () => {
    const trimmedPassword = (form) => {
      for (let key in form) {
        if (typeof form[key] === "string") {
          form[key] = form[key].trim();
        }
      }
      return form;
    };
    const trimmedForm = trimmedPassword({ ...form });
    if (Object.values(trimmedForm).some((value) => value === "")) {
      toast.warning("Data Cannot be Empty",{theme:"dark",closeOnClick: true,})
      return;
    }
    toast.success("Password Saved!",{theme:"dark",closeOnClick: true,})
    setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    localStorage.setItem(
      "passwords",
      JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
    );
    setform({ site: "", username: "", password: "" });
    seteditingPasswordid(null);
  };

  const handleDelete = (e, id) => {
    setshowDeletepopup(true);
    setpasswordToDelete(id);
  };

  const confirmDelete = () => {
    if(isDeleting) return;
    setisDeleting(true)
    // console.log("Deleting password with id:", passwordToDelete);
    const updatedPasswordArray = passwordArray.filter(
      (item) => item.id !== passwordToDelete
    )
    setpasswordArray(updatedPasswordArray)
    
    localStorage.setItem(
      "passwords",
      JSON.stringify(
        updatedPasswordArray
      )
    );
    setshowDeletepopup(false);
    setpasswordToDelete(null);
    toast.success("Deleted Successfully", {

      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setisDeleting(false)
    // console.log([...passwordArray, form]);
  };

  const cancelDelete = () => {
    setshowDeletepopup(false);
    setpasswordToDelete(null);
  };

  const editPassword = (id) => {
    if (editingPasswordid && editingPasswordid !== id) {
      // If there's already an edited todo, don't allow editing a new one without saving
      alert("Please save the current edit before editing another todo.");
      return; // Prevent further execution if another todo is being edited
    }
    const passwordstoedit = passwordArray.find((item) => item.id === id);
    if (passwordstoedit) {
      console.log("Editing password with id:", id);
      setform(passwordArray.filter((item) => item.id === id)[0]);
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      seteditingPasswordid(id);
    }

    // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((item)=>item.id!== id)))
    // console.log([...passwordArray, form]);
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      savePassword();
    }
  };

  const copyText = (text) => {
    toast("Copied to Clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer />
      {/* Same as */}
     
      <div
        className={`main ${
          showDeletepopup ? "blur-lg pointer-events-none" : ""
        } transition-all duration-500`}
      >
        <div
          className={`transition-all absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[lordiconcopy size:14px_24px]`}
        >
          <div className="absolute left-0 right-0 top-0 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
        </div>

        <div className="md:container md:px-28 md:mx-auto md:w-[70vw] px-2  py-4 md:py-12 min-h-[86.5vh] md:min-h-[80.45vh]">
          <h1 className="text-2xl md:text-4xl font-bold text-center">
            <span className="text-green-500">&lt;</span>
            Pass
            <span className="text-green-500">OP/&gt;</span>
          </h1>
          <p className="text-center text-green-900 md:text-md md:text-lg">
            Your own Password Manager
          </p>
          <div className="flex flex-col p-4 gap-7 items-center">
            <input
              value={form.site}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter Website URL"
              className="rounded-full border border-green-500 px-4 py-1 w-full"
              type="text"
              name="site"
              id=""
            />
            <div className="flex md:flex-row flex-col w-full gap-5">
              <input
                value={form.username}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter Username"
                className="rounded-full border border-green-500 px-4 py-1 md:w-3/4"
                type="text"
                name="username"
                id=""
              />
              <div className="relative">
                <input
                  value={form.password}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter Password"
                  className="rounded-full border border-green-500 px-4 py-1 w-full"
                  ref={passwordRef}
                  type="password"
                  name="password"
                  id=""
                />
                <span
                  onClick={showPassword}
                  className="absolute right-[8px] top-[6px] cursor-pointer"
                >
                  <img ref={ref} src={eyecross} alt="" />
                </span>
              </div>
            </div>
            <button
              onClick={savePassword}
              className="flex border border-green-500 hover:transition-all hover:outline-green-500 justify-center items-center gap-2 hover:bg-green-300 bg-green-400 rounded-full px-5 py-1"
            >
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"
              ></lord-icon>
              Save
            </button>
          </div>
          <div className="passwords">
            <h2 className="text-xl font-bold py-3">Your Passwords</h2>
            {passwordArray.length == 0 && <div className="text-center">No Passwords to show</div>}
            {passwordArray.length != 0 && (
              <table className="table-auto w-full overflow-hidden rounded-lg">
                <thead className="bg-green-800 text-white">
                  <tr>
                    <th className="py-2 px-3">Site</th>
                    <th className="py-2 px-3">Username</th>
                    <th className="py-2 px-3">Password</th>
                    <th className="py-2 px-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-green-100">
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td  className="p-2 border border-white">
                          <div className="flex justify-center items-center">
                            <a
                              className="hover:underline"
                              target="_blank"
                              href={item.site}
                            >
                              {item.site}
                            </a>

                            <div
                              className="lordiconcopy size-7 cursor-pointer"
                              onClick={() => {
                                copyText(item.site);
                              }}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/depeqmsz.json"
                                trigger="hover"
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  paddingLeft: "3px",
                                  paddingTop: "3px",
                                }}
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="text-center  p-2 border border-white">
                          <div className="flex justify-center items-center">
                            {item.username}
                            <div
                              className="lordiconcopy size-7 cursor-pointer"
                              onClick={() => {
                                copyText(item.username);
                              }}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/depeqmsz.json"
                                trigger="hover"
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  paddingLeft: "3px",
                                  paddingTop: "3px",
                                }}
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="text-center  p-2 border border-white">
                          <div className="flex justify-center items-center">
                            {item.password}
                            <div
                              className="lordiconcopy size-7 cursor-pointer"
                              onClick={() => {
                                copyText(item.password);
                              }}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/depeqmsz.json"
                                trigger="hover"
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  paddingLeft: "3px",
                                  paddingTop: "3px",
                                }}
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="text-center  p-2 border border-white">
                          <div className="flex justify-center items-center">
                            <span
                              className="cursor-pointer mx-1"
                              onClick={() => {
                                editPassword(item.id);
                              }}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/pflszboa.json"
                                trigger="hover"
                                style={{ width: "25px", height: "25px" }}
                              ></lord-icon>
                            </span>
                            <span
                              className="cursor-pointer mx-1"
                              onClick={(e) => {
                                handleDelete(e, item.id);
                              }}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/wpyrrmcq.json"
                                trigger="hover"
                                style={{ width: "25px", height: "25px" }}
                              ></lord-icon>
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      {showDeletepopup && (
        <Delete onConfirm={confirmDelete} onCancel={cancelDelete} />
      )}
    </>
  );
};

export default Manager;
