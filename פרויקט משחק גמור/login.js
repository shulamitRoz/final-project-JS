const fname = document.querySelector('#fname');
const email = document.querySelector('#email');
const submit1 = document.querySelector("#sub")
let users = JSON.parse(localStorage.getItem('users')) || [];

submit1.addEventListener('click', chek);

function chek() {
    document.getElementById("logInBip").play();
    /*   במקרה ויש לנו כזה חבר flag =FALSE והוא מעביר אותו למשחק*/
    let flag = true;
    for (let i = 0; i < users.length && flag; i++) {
        if (users[i].email == email.value)
            flag = false;
    }
    if (!flag) {
        alert([`  ברוך הבא חיכינו לך ${fname.value}  😃😃😃`] );
    }
    else {
        let newuser = {
            fname: fname.value,
            email: email.value,

        }
        users.push(newuser); //מכניס את המשתמש לתוך המערך.

        alert([` תודה שנרשמת אלינו  ${fname.value}  😎😎😎`]);

    }
    localStorage.setItem('users', JSON.stringify(users));//מכניס את המערך לתוך הלוקל

    window.location.assign("home.html");//עובר לדף של המשחק 
    //מאפס את הערך של האינפוט
    fname.value="";
    email.value="";
    flag = true;
}