import apiClient from "@/app/services/apiClient";



type fetchDataProps<T> = {
  params?: Record<string, string>;
  url: string;
};

const fetchData = async <T>({
  params,
  url,
}: fetchDataProps<T>) => {
  try {
    const { data } = await apiClient.get<T>(url, {
      params,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
};



export { fetchData };