var data = [{
      "id":0,
      "data":"PHP ",
      "image":"https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/022013/elephant_php_color_0.png?itok=Nof3osoL",
      "about":"PHP is a server-side scripting language designed primarily for web development but also used as a general-purpose programming language.",
      "items":[]
},{
       "id":1,
      "data":"Javascript",
      "image":"https://secure.meetupstatic.com/photos/event/5/7/d/3/global_436702483.jpeg",
      "about":"JavaScript, often abbreviated as JS, is a high-level, dynamic, weakly typed, prototype-based, multi-paradigm, and interpreted programming language",
      "items":[]
},{
       "id":2,
      "data":"ANGULAR JS",
      "image":"https://www.w3schools.com/angular/pic_angular.jpg",
      "about":"Angular is a TypeScript-based open-source front-end web application platform led by the Angular Team at Google and by a community of individuals and corporations to address all of the parts of the ",
      "items":[]
},{
     "id":3,
    "data":"REACT JS",
    "image":"https://www.barcelonacodeschool.com/wp-content/uploads/2017/08/react-js.png",
    "about":"In computing, React is a JavaScript library for building user interfaces. It is maintained by Facebook, Instagram and a community of individual developers and corporations",
    "items":[]
}];

var TABS =  document.getElementsByClassName('tab');
document.getElementById('buttonArea').style.visibility="hidden";
var selectedTab =0;

var out = document.getElementById('printArea');
for(let i=0 ; i< TABS.length ; i++ ){
    TABS[i].addEventListener('click',function(){
            document.getElementById('buttonArea').style.visibility="visible";
            selectedTab =  i;  
            var out_str = "<div><h2 align=\"center\">"+data[i].id +
              "</h2>"+"<div class=\"image_div\"><img src='"+
                data[i].image+"'class=\"center_img\"></div><br/><h3 align=\"center\">"+
                data[i].data+"</h3><h4 align=\"center\">"+
                data[i].about+"</h4></div>";
            out.innerHTML = out_str;
            render_items(selectedTab);
  });
}

let printArea = document.getElementById('printArea');
function changeFont(){
    var v  = document.getElementById('slider');
    console.log(v.value);
    printArea.style.fontSize =v.value+"px";
}


function render_items(selected_tab_id){   
      var item_html = "";
            if(data[selected_tab_id].items.length < 1){
                     
                item_html = "Sorry  Currently there is No item is Addedd..";
            }else{
                for(let j=0 ; j < data[selected_tab_id].items.length ;j++){
                   item_html += "<li><button onclick=\"Delete_item('"+selected_tab_id+"','"+j+"')\">X</button>&nbsp;&nbsp;"+data[selected_tab_id].items[j];
                }  
      
                item_html += "</li>";
            }
          document.getElementById('item_list').innerHTML = item_html;
}

function Delete_item(tab_id,item_id){
     data[tab_id].items.splice(item_id,1);
     render_items(tab_id);
}

function addItem(){
  var tmp  = prompt("Please Enter Item Name : ");
  data[selectedTab].items.push(tmp);
  render_items(selectedTab);
  
}
//document.getElementById("myP").style.fontSize = "xx-large";