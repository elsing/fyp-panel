// import { useState } from "react";
// import { json } from "stream/consumers";
// // import { useSWR } from "swr";
// import useSWR from "swr";

// const Login: React.FC = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const { data, error } = useSWR("http://127.0.0.1:8000/auth", loginFetcher);

//   async function loginFetcher(username: string, password: string) {
//     const res = await fetch("http://127.0.0.1:8000/auth", {
//       method: "POST",
//       body: JSON.stringify({ username, password }),
//       headers: { "Content-Type": "application/json" },
//     });
//     return res.json();
//   }

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     const res = await loginFetcher(username, password);
//     console.log(res.status);
//     if (res.status === 401 || res.status === 400) {
//       // Handle login error
//       console.log("error");
//       // return res.error;

//       return JSON.stringify({ error: "error" });
//     } else {
//       console.log("success");
//       // Handle successful login
//       return JSON.stringify({ success: "success" });
//     }
//   }

//   return (
//     <div className="m-10">
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Log in</button>
//       </form>
//       {error && <div>Failed to login</div>}
//       {/* {data.user.name} */}
//       {data && <div>Welcome back, !</div>}
//     </div>
//   );
// };

// export default Login;

// import { useState, useCallback } from "react";
// import { useForm } from "react-hook-form";
// import useSWR from "swr";

// const Login: React.FC = () => {
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//   } = useForm<IFormInputs>();
//   // const[(error, setError)] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   async function loginFetcher(data: JSON) {
//     const res = await fetch("http://127.0.0.1:8000/auth", {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: { "Content-Type": "application/json" },
//     });
//     return res.json();
//   }

//   const onSubmit = async (data: JSON) => {
//     setIsLoading(true);
//     try {
//       const res = await loginFetcher(data);
//       console.log(res.status);
//       console.log(res);
//       if (res.status === 401 || res.status === 400) {
//         console.log("Failed");
//       } else {
//         console.log("Success");
//       }
//       // setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <section className="dark:bg-gray-800 bg-gray-200">
//       <div
//         className="flex flex-col items-center justify-center
//       mx-auto py-8 px-6 md:h-screen"
//       >
//         <h1 className="dark:text-white text-black text-4xl">Watershed</h1>
//         <div className="bg-blue-400 p-6 my-5 rounded-2xl w-full">
//           <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
//             <h1 className="my-2">Please sign in...</h1>
//             <input
//               className="rounded-lg"
//               {...register("username", { required: true })}
//             />
//             {errors.username && "Username is required"}
//             <input
//               className="rounded-lg"
//               type="password"
//               {...register("password", { required: true })}
//             />
//             {errors.password && "Password is required"}
//             <button type="submit" disabled={isLoading}>
//               {isLoading ? "Loading..." : "Login"}
//             </button>
//             {/* {errors && <p>{errors}</p>} */}
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Login;
