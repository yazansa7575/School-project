let header = document.getElementById("header");
let goToTop_arrow = document.getElementById("goToTop");
let tbody = document.getElementById("tbody");
let followBtn = document.getElementById("followBtn");
let formContainer = document.getElementById("formContainer");
let cap = document.getElementById("captcha");
let captchaField = document.getElementById("captchaInput");

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
      img: "./images/Properties/Properties(2).jpg",
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
      img: "./images/Properties/Properties(3).jpg",
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
      img: "./images/Properties/Properties(4).jpg",
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
  followBtn.disabled = false;
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
const submitForm = (event) => {
  event.preventDefault();

  const token = executeRecaptcha();
  if (token) {
    let selectedProperty = JSON.parse(localStorage.getItem("cart"));
    if (selectedProperty) {
      let message = `تم استلام طلبك بنجاح ✅`;
      // create modal
      let modalContent = `<div id="myModal" class="modal">
        <div class="modal-content">
          <div>
            <span class="close">X</span>
            <p id="modalMessage">${message}</p>
          </div>
          <div
            style="
              text-align: right;
              display: flex;
              align-items: center;
              justify-content: space-around;
            "
          >
            <div>
              <p style="color:black; font-size: 24px" ;>
                - المنطقة :${selectedProperty[0].info.Region}
              </p>
              <p style="color:black; font-size: 24px" ;>
                - الطابق :${selectedProperty[0].info.Floor}
              </p>
              <p style="color:black; font-size: 24px" ;>
                - الملكية :${selectedProperty[0].info.Property}
              </p>
              <p style="color:black; font-size: 24px" ;>
                - مفروش :${selectedProperty[0].info.Furnished}
              </p>
              <p style="color:black; font-size: 24px" ;>
                - معلومات اخرى :${selectedProperty[0].info.other}
              </p>
            </div>
            <div>
              <img
                loading="lazy"
                src="${selectedProperty[0].info.img}"
                alt="img"
                width="200px"
              />
            </div>
          </div>
        </div>
      </div>`;
      // add the modal to doc
      $("body").append(modalContent);
      // open it -->open the modal
      $("#myModal").css("display", "flex");
      $("body").css("overflow", "hidden");
      // close it -->close the modal
      $(".close").click(function () {
        $("#myModal").css("display", "none");
        $("body").css("overflow", "auto");
        setTimeout(() => {
          window.location.href = "./Home.html";
        }, 1000);
      });
      // delete cart from local storge
      localStorage.removeItem("cart");
    } else {
      alert("حدث خطأ أثناء معالجة الطلب.");
    }
  } else {
    alert("فشل التحقق من Captcha");
  }
};

// verifyCaptcha
let captcha = "";
function generateCaptcha() {
  var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var captchaLength = 6;
  for (var i = 0; i < captchaLength; i++) {
    var index = Math.floor(Math.random() * chars.length);
    captcha += chars[index];
  }
  return captcha;
}

window.onload = function () {
  refreshCaptcha();
};

function refreshCaptcha() {
  var captcha = generateCaptcha();
  cap.innerText = captcha;
}

// captcha validation
const executeRecaptcha = () => {
  if (captchaField.value === captcha) return true;
  else return false;
};
