import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Chatbox from "./chatBox";


export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("user", user);

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="w-full h-full">
       <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <AuthButton />
            {/* {user} */}
          </div>
        </nav>
      <Chatbox />
    </div>
  );
}
