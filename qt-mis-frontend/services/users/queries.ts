import { ApiResponse, IUser } from "@/types/schema";
import { useQuery } from "@tanstack/react-query";


const fetchUsers = async (page:number,limit:number) => {
    const response = await fetch(`http://localhost:8080/api/v1/users?page=${page}&limit=${limit}`, {
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer  ${localStorage.getItem('qtToken')}`,
        'Content-Type': 'application/json'
      },
    });
  
    return await response.json();
  };


export const useGetUsers = ({ page, limit }: { page: number, limit: number }) => {
    return useQuery<ApiResponse<IUser>>({queryKey: ['users', {page, limit}], queryFn: () => fetchUsers(page, limit)});
  };