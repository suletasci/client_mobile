import { gql } from "@apollo/client";

export const COURSES_QUERY = gql`
{
  coursesList {
    id
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
    isArchived
    createdAt
    updatedAt
  }
}
`;