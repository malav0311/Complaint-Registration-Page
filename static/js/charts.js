
var firebaseConfig = {
    apiKey: "AIzaSyDV_CPfNZ_9D_gmQrxZcbo7SMS_9GQGYcE",
    authDomain: "city-5dc6f.firebaseapp.com",
    databaseURL: "https://city-5dc6f-default-rtdb.firebaseio.com",
    projectId: "city-5dc6f",
    storageBucket: "city-5dc6f.appspot.com",
    messagingSenderId: "876826563048",
    appId: "1:876826563048:web:d82f14c0aad5094cf6145d"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);



var db = firebase.database().ref("UserInfo");


var el=0;
var cr=0;
var wa=0;
var se=0;
var rd=0;
var gb=0;
var sev=0;
var nosev=0;
var ti=0;
var lo=0;
var pr=0;
var npr=0;
var mySet1 = new Set();


user = db.on('value', function(snapshot) {
     snapshot.forEach(function(childSnapshot) {
       var childData = childSnapshot.val();
       mySet1.add(childData.location);
       ti = ti + 1;
       if(childData.issue === "water"){
         wa = wa + 1;
       }
       else if(childData.issue === "electric"){
           el = el + 1;
       }
       else if(childData.issue === "crime"){
         cr = cr + 1;
     }
     else if(childData.issue === "sewage"){
         se = se + 1;
     }
     else if(childData.issue === "road"){
         rd = rd + 1;
    }
     else if(childData.issue === "garbage"){
        gb = gb + 1;
     }

     if(childData.severity === "Severe"){
         sev = sev + 1;
     }
     else{
         nosev = nosev + 1;    
     }
     if(childData.progress === 0){
      pr = pr + 1;
     }
     else{
       npr = npr + 1;
     }
    
     });
     document.getElementById("numLoc").innerHTML = mySet1.size;
     document.getElementById("total").innerHTML = ti;
     document.getElementById("severe").innerHTML = sev;
     document.getElementById("notsevere").innerHTML = nosev;
     document.getElementById("numPro").innerHTML = pr;
     document.getElementById("numCom").innerHTML = npr;
     var options = {
        chart: {
          type: 'bar',
          height: 300,
          width: 1000,
        },
        colors: ["#FFE227","#BB2205","#28ABB9","#6930C3","#000000","#C06014"],
        plotOptions: {
            bar: {
              horizontal: true,
              distributed :true,
            }
          },
          title: {
            text: "Count of Every Issue",
            align: 'center',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize:  '30px',
              fontWeight:  "20px",
              fontFamily:  "oswald",
              color:  '#263238'
            },
        },
        series: [{
          name: 'Issue Count',
          data: [el,cr,wa,se,rd,gb]
        }],
        xaxis: {
          categories: ['Electricity','Crime','Water','Sewage','Road','Garbage']
        }
      }
      
      var piechart = {
        series: [pr, npr],
        chart: {
          width: 300,
          type: "donut"
        },
        colors:["#BB2205","#28ABB9"],
        legend: {
          show: true,
          customLegendItems: ['In Progress','Completed'],
        },
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 90,
            offsetY: 10
          }
        },
        grid: {
          padding: {
            bottom: -80
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              
            }
          }
        ]
      };


      var chart = new ApexCharts(document.querySelector("#chart"), options);
      var chart1 = new ApexCharts(document.querySelector("#chartpie"), piechart);
      
      chart.render();
      chart1.render();
 });

 



//  let issuechart = new Chart(mychart, {
     
//      type:'bar',
//      data:{
//          labels:['Electricity','Crime','Water','Sewage','Road','Garbage'],
//          datasets:[{
//              label: 'Issues',
//              data:[el,cr,wa,se,rd,gb]
//          }],
//          backgroundColor:'green'
//      },
//  });