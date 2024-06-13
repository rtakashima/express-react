import moment from "moment";

//check if the person is less than 10yo
export default function isAgeLessThan10(birthdate?: Date): Boolean {
  return moment().diff(moment(birthdate, "YYYY/dd/MM"), "years") < 10;
}
