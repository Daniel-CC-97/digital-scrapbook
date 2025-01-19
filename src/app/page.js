import AddPostButton from "./components/AddPostButton";
import Feed from "./components/Feed";

export default function Home() {
  return (
    <div className="w-screen h-screen relative">
      <Feed />
      <AddPostButton></AddPostButton>
    </div>
  );
}
