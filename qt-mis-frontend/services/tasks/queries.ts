import { ApiResponse, EPriority, EStatus, Optional, ITask } from "@/types/schema";
import { useQuery } from "@tanstack/react-query";

type FetchTaskOptions = {
    q: string
    page: number
    limit: number
    sort: string
    status: EStatus
    priority: EPriority
}


export const useGetTasks = (options:Optional<FetchTaskOptions>) => {
  const tasks = useQuery<ApiResponse<ITask>>({
    queryKey: ["tasks",{...options}],
    queryFn: () => fetchTasks(options),
  });

  return tasks;
}


async function fetchTasks({q,priority,status,page,limit}: Optional<FetchTaskOptions> = {}): Promise<ApiResponse<ITask>> {

    let url = new URL("http://localhost:8080/api/v1/tasks");
    let params = new URLSearchParams();

    q && params.append("q", q);
    priority && params.append("priority", priority);
    status && params.append("status", status);
    page && params.append("page", page.toString());
    limit && params.append("limit", limit.toString());

    url.search = params.toString();

    const  response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("qtToken")}`,
            'Content-Type': 'application/json',
            'Accept': '*/*'
        }
    }); 

    return await response.json();
}