export const requestHandler = async (api, setLoading, onSucess, onError) => {
  try {
    setLoading && setLoading(true);
    // await sleep(5000);
    const { data } = await api();
    
    if (data?.success) {
      onSucess(data);
    }
  } catch (error) {
    
    if ([401, 403].includes(error?.response?.data?.statusCode)) {
      if (isBrowser) {
        // window.location.href = "/login";
      }
    }
    onError(error);
  } finally {
    setLoading && setLoading(false);
  }
};

export const isBrowser = typeof window !== "undefined";

const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));
