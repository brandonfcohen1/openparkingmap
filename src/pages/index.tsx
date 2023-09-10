import { useEffect } from "react";
import { useRouter } from "next/router";
import { defaultViewport } from "@/config/defaults";

const Home = () => {
  const router = useRouter();

  const { longitude, latitude, zoom } = defaultViewport;

  useEffect(() => {
    router.replace(`/${latitude}/${longitude}/${zoom}`);
  }, []);

  return <div>Redirecting...</div>;
};

export default Home;
