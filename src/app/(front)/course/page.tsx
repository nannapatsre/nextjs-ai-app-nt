import FeaturesCourse from "@/components/features-course";

// http://localhost:3000/course
export default async function CoursePage() {
  const response = await fetch('https://api.codingthailand.com/api/course');
  const courseResponse = await response.json();

  return (
    <main>
      {
        courseResponse.data.length > 0 && <FeaturesCourse courses={courseResponse.data} />
      }
    </main>
  );
}
