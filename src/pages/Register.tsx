import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
};

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    alert(`Bienvenido, ${data.name}!`);
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input 
          type="text" 
          placeholder="Name"
          className="w-full p-2 rounded"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className="text-red-400">{errors.name.message}</p>}

        <input 
          type="email" 
          placeholder="Email"
          className="w-full p-2 rounded"
          {...register("email", { 
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
          })}
        />
        {errors.email && <p className="text-red-400">{errors.email.message}</p>}

        <button type="submit" className="w-full bg-green-500 py-2 rounded-lg mt-2 hover:bg-green-600">
          Register
        </button>
      </form>
    </div>
  );
}