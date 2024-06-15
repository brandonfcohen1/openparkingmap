import { useEffect } from "react";
import { useRouter } from "next/router";
import { defaultViewport } from "@/config/defaults";

const Home = () => {
  const router = useRouter();

  // Redirect to default or saved location
  useEffect(() => {
    const { longitude, latitude, zoom } = defaultViewport;

    const localLatitude = localStorage.getItem("latitude") as string;
    const localLongitude = localStorage.getItem("longitude") as string;
    const localZoom = localStorage.getItem("zoom") as string;

    if (localLatitude && localLongitude && localZoom)
      router.replace(`/${localLatitude}/${localLongitude}/${localZoom}`);
    else router.replace(`/${latitude}/${longitude}/${zoom}`);
  }, [router]);

  return <div>Redirecting...</div>;
};

export default Home;
