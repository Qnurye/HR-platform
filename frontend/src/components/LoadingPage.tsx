import {LoaderIcon} from "lucide-react";

const LoadingPage = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="flex items-center space-x-2">
      <LoaderIcon className="animate-spin h-5 w-5 text-gray-500"/>
      <span className="text-gray-500"> 加载中 </span>
    </div>
  </div>
)

export default LoadingPage;
