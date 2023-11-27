// use query to query the following api and return the given result
// curl request:
// curl -X 'GET' \
//   'http://localhost:8080/api/v1/projects/search?page=1&limit=100' \
//   -H 'accept: */*' \
//   -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI5ZjJiNTI2Yy1hNzA4LTQzNTEtOWEyMi0wMzcwYjg0MGJmZGQiLCJzdWIiOiJhZG1pbkBxdC5ydyIsImF1dGhvcml0aWVzIjpbXSwidXNlciI6eyJmdWxsTmFtZXMiOm51bGwsImlkIjoiOWYyYjUyNmMtYTcwOC00MzUxLTlhMjItMDM3MGI4NDBiZmRkIiwiZW1haWxBZGRyZXNzIjoiYWRtaW5AcXQucnciLCJyYW5rSWQiOm51bGwsInN0YXR1cyI6IlBFTkRJTkcifSwiaWF0IjoxNzAxMDk4NDM3LCJleHAiOjE3MDExODQ0Mzd9.ZnxaF0mWJbrwWODiYVP_dmfNFhUHmzkKH3XLZQxwDg0'
// sample data:
// {
//     "data": {
//       "content": [
//         {
//           "id": "112d44a8-a0cc-4f02-934f-f04b88ec8d57",
//           "name": "PROJECT A",
//           "description": "sample project a",
//           "status": "ACTIVE",
//           "tasks": [],
//           "authority": "PROJECT A"
//         }
//       ],
//       "pageable": {
//         "sort": {
//           "empty": false,
//           "sorted": true,
//           "unsorted": false
//         },
//         "offset": 0,
//         "pageNumber": 0,
//         "pageSize": 100,
//         "paged": true,
//         "unpaged": false
//       },
//       "totalPages": 1,
//       "totalElements": 1,
//       "last": true,
//       "size": 100,
//       "number": 0,
//       "sort": {
//         "empty": false,
//         "sorted": true,
//         "unsorted": false
//       },
//       "numberOfElements": 1,
//       "first": true,
//       "empty": false
//     },
//     "message": "Projects retrieved successfully.",
//     "status": "OK",
//     "timestamp": "2023-11-28T12:54:37.517634"
//   }

import { ApiResponse, IProject } from "@/types/schema";
import { useQuery } from "@tanstack/react-query";

const getProjects = async (page: number, limit: number) => {
    const response = await fetch(`http://localhost:8080/api/v1/projects/search?page=${page}&limit=${limit}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('qtToken')}`,
            'accept': '*/*',
            'Content-Type': 'application/json'
        }
});

    return await response.json();
}

export const useGetProjects = ({ page, limit }: { page: number, limit: number }) => {
    return useQuery<ApiResponse<IProject>>({queryKey: ['projects', {page, limit}], queryFn: () => getProjects(page, limit)});
}