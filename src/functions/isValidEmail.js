export default function isValidEmail(email) {

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));
  {
    return (true)
  }
    //alert("You have entered an invalid email address!")
    return (false)
}
