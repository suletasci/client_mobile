import { gql, useMutation } from "@apollo/client";
 

export const CREATE_COURSES = gql`
mutation CreateCourses($newCoursesInput: CoursesInput!) {
    createCourses(newCoursesInput: $newCoursesInput) {
      coursename
      shortdescription
      longdescription
      author
      province
      district
      coursecapacity
      price
      imageUrl
      courselike
      activeparticipant
    }
  }
`;
