export type Course = {
  id: number;
  title: string;
  detail: string;
  picture: string;
};

type CourseApiResponse = {
  data: Course[];
};

export async function getCourses(): Promise<Course[]> {
  const response = await fetch('https://api.codingthailand.com/api/course');
  const json: CourseApiResponse = await response.json();
  return json.data;
}
