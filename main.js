let header = document.getElementById("header");
let goToTop_arrow = document.getElementById("goToTop");
let tbody = document.getElementById("tbody");
let formContainer = document.getElementById("formContainer");

// on scroll - hide header/ show arrow
window.onscroll = () => {
  if (window.scrollY > 200) {
    header.style.top = "-200px";
    goToTop_arrow.style.width = "50px";
  } else {
    header.style.top = "0px";
    goToTop_arrow.style.width = "0px";
  }
};
// when click on arrow scroll to top
goToTop_arrow.addEventListener("click", () => {
  window.scrollTo({
    top: "0",
  });
});

// table fun ===
// console.log("tbody", tbody);

//  dynamic data tbody [in table]
let Properties_data = [
  {
    id: 1,
    city: "دمشق",
    details: "شقة 70 متر",
    monthly_rent: "140.000 ل.س",
    info: {
      Region: "ركن الدين ",
      Floor: "طابق اول  ",
      Property: "طابو اخضر ",
      Furnished: "لا ",
      other: "مع بلكون 12 متر  ",
      img: "./images/Properties/Properties(1).jpg",
    },
  },
  {
    id: 2,
    city: "ريف دمشق",
    details: "شقة 120 متر",
    monthly_rent: "270.000 ل.س",
    info: {
      Region: "ركن الدين ",
      Floor: "طابق اول  ",
      Property: "طابو اخضر ",
      Furnished: "لا ",
      img: "/images/Properties/Properties(2).jpg",
      other: "مع بلكون 12 متر  ",
    },
  },
  {
    id: 3,
    city: "حمص",
    details: "شقة 180 متر",
    monthly_rent: "120.000 ل.س",
    info: {
      Region: "ركن الدين ",
      Floor: "طابق اول  ",
      Property: "طابو اخضر ",
      Furnished: "لا ",
      img: "/images/Properties/Properties(3).jpg",
      other: "مع بلكون 12 متر  ",
    },
  },
  {
    id: 4,
    city: "حماة",
    details: "شقة 70 متر",
    monthly_rent: "120.000 ل.س",
    info: {
      Region: "ركن الدين ",
      Floor: "طابق اول  ",
      Property: "طابو اخضر ",
      Furnished: "لا ",
      img: "/images/Properties/Properties(4).jpg",
      other: "مع بلكون 12 متر  ",
    },
  },
];
// show dynamic data in
let out = "";
for (let i = 0; i < Properties_data.length; i++) {
  out += ` 
  <tr id="${Properties_data[i].id}">
    <td>${Properties_data[i].city}</td>
    <td>${Properties_data[i].details}</td>
    <td>${Properties_data[i].monthly_rent}</td>
    <td><input type="checkbox" name="checkbox" onclick="checkbox_Clicked(${Properties_data[i].id},this.checked)"/></td>
    <td><input type="radio" name="radio" onclick="radio_Clicked(${Properties_data[i].id})" /></td>
  </tr>
  `;
}
tbody.innerHTML = out;

// checkbox Clicked fun
let newRow;
const checkbox_Clicked = (id, ischecked) => {
  if (ischecked) {
    let reqTR = document.getElementById(id);
    newRow = document.createElement("tr");
    newRow.id = "newRow";
    let newCell = document.createElement("td");
    newCell.setAttribute("colspan", "5");
    newCell.innerHTML = `
   <div style="text-align: right;display: flex;align-items: center;justify-content: space-around;">
    <div>
      <p style="color:#6195ff;font-size:24px";> - المنطقة :${
        Properties_data[id - 1].info.Region
      } </p>
      <p style="color:#6195ff;font-size:24px";> - الطابق :${
        Properties_data[id - 1].info.Floor
      } </p>
      <p style="color:#6195ff;font-size:24px";> - الملكية :${
        Properties_data[id - 1].info.Property
      } </p>
      <p style="color:#6195ff;font-size:24px";> - مفروش :${
        Properties_data[id - 1].info.Furnished
      } </p>
      <p style="color:#6195ff;font-size:24px";> - معلومات اخرى :${
        Properties_data[id - 1].info.other
      } </p>
    </div>
    <div>
      <img loading="lazy" src=${
        Properties_data[id - 1].info.img
      } alt="img" width="300px" />
    </div>
   </div>

    `;
    newRow.appendChild(newCell);
    reqTR.parentNode.insertBefore(newRow, reqTR.nextSibling);
  } else {
    let newRowElement = document.getElementById("newRow");
    if (newRowElement) {
      newRowElement.remove();
    }
  }
};
// radio Clicked fun
const radio_Clicked = (id) => {
  let cart = [];
  cart.push(Properties_data[id - 1]);
  localStorage.setItem("cart", JSON.stringify(cart));
};
// open Form Fun
const openFormFun = () => {
  if (typeof JSON.parse(localStorage.getItem("cart"))[0].id == "number")
    formContainer.style.display = "block";
  formContainer.scrollIntoView();
  let setTime = setTimeout(() => {
    formContainer.scrollIntoView();
    clearTimeout(setTime);
  }, 400);
};
// submit Form
const submitForm = async (event) => {
  event.preventDefault();
  const token = grecaptcha.getResponse();
  console.log(token); 

  try {
    const captchaVerified = await verifyCaptcha(token);
    if (captchaVerified) {
      let selectedProperty = JSON.parse(localStorage.getItem("cart"));
      if (selectedProperty) {
        let message = `تم استلام طلبك بنجاح! تم اختيار العقار: ${selectedProperty[0].details}`;
        alert(message);
      } else {
        alert("حدث خطأ أثناء معالجة الطلب.");
      }
    } else {
      alert("فشل التحقق من Captcha");
    }
  } catch (error) {
    console.error(error);
    alert("حدث خطأ أثناء التحقق من Captcha");
  }
};

// verifyCaptcha
const verifyCaptcha = (token) => {
  return new Promise((resolve, reject) => {
    fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=6LfeQdcpAAAAAMyDZfCdC-rmGgoSzV4b_pKcbQe_&response=${token}`,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          resolve(true);
        } else {
          reject("Failed Captcha verification");
        }
      })
      .catch((error) => reject(error));
  });
};
