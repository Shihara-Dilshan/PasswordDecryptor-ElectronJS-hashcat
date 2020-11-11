const electron = require("electron");
const url = require("url");
const path = require("path");
const prompt = require("electron-prompt");
const Alert = require("electron-alert");
const axios = require("axios");

const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let addEntryWindow;


app.on("ready", () => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "mainWindow.html"),
      protocol: "file",
      slashes: true,
    })
  );

  const mainMenu = Menu.buildFromTemplate(MainMenu);
  Menu.setApplicationMenu(mainMenu);
});

const MainMenu = [
  {
    label: "File",
    submenu: [
      {
        label: "Exit",
        click() {
          app.quit();
        },
      },
      {
        label: "Restart",
        click() {
          app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) });
app.exit(0);
        },
      },
    ],
  },
  {
     label: "Attack",
     click(){
        prompt({
            title: "New Dictionary Attack",
            label: "Enter hash Code",
            value: "",
            inputAttrs: {
              type: "text",
              required: true,
            },
            type: "input",
          })
            .then((r) => {
              if (r === null || r === undefined || r.length === 0) {
                console.log("user cancelled");
              } else {
              	prompt({
            title: "New Dictionary Attack",
            label: "Enter hashcat Code",
            value: "",
            inputAttrs: {
              type: "text",
              required: true,
            },
            type: "input",
          })
            .then((q) => {
              if (q === null || q === undefined || q.length === 0) {
                console.log("user cancelled");
              } else {
               
               let swalOptions = {
	position: "top-end",
	title: "This may take a while",
	type: "error",
	width: 400,
	showConfirmButton: true,
	timer: 10000
};

Alert.fireToast(swalOptions);
              
                 axios
                     .get(`http://localhost:54774/api/v2/hash/${q}/${r}/0`)
                     .then(res2 => {
                        console.log(res2.data.output)
                       const Alert5 = require("electron-alert");
                       if(res2.data.output.indexOf("Exhausted") !== -1){
                          let swalOptions5 = {
	position: "center",
	title: "coudn,t find any matches",
	width: 400,
	type: "error",
	showConfirmButton: true,
	timer: 65000
};
Alert5.fireToast(swalOptions5);
return;
                       
                       }else if(res2.data.output.indexOf("All hashes found in potfile") !== -1){
                          const Alert6 = require("electron-alert");
                          let swalOptions6 = {
	position: "center",
	title: "Already cracked value. View cracked passwords",
	width: 400,
	type: "error",
	showConfirmButton: true,
	timer: 65000
};
Alert6.fireToast(swalOptions6);
return;
                       }else if(res2.data.output.indexOf("Cracked") !== -1){
                           axios
                  .get(`http://localhost:54774/api/v2/readfile`)
                  .then((res11) => {
                      
                      let resultfinal11 = res11.data.output.lastIndexOf(":");
                      
		      
                      const Alert11 = require("electron-alert");
                       let swalOptions11 = {
	position: "center",
	title: "Password is : " +res11.data.output.substring(resultfinal11+1,res11.data.output.length-1),
	width: 700,
	type: "success",
	showConfirmButton: true,
	timer: 65000
};
Alert11.fireToast(swalOptions11);
return;

                       })
                     .catch(err2 => console.log(err2));
                       }
                       const index = res2.data.output.indexOf("Candidates.#1....:");
                       const result4 = res2.data.output.substring(index, res2.data.output.length);
                       const result5 = result4.replace("Candidates.#1....:", "Password Can be" );
                       const result6 = result5.replace("->", "or" );
                        
                     
                     })
                     .catch(err2 => console.log(err2));

  			
                 
              }
            })
            .catch(console.error);   

  
                 
              }
            })
            .catch(console.error);   
     }
  },
  {
     label: "Analize",
     click(){
         prompt({
            title: "Analize a hash",
            label: "Hash String:",
            value: "",
            inputAttrs: {
              type: "text",
              required: true,
            },
            type: "input",
          })
            .then((r) => {
              if (r === null || r === undefined || r.length === 0) {
                console.log("user cancelled");
              } else {
              const Alert2 = require("electron-alert");

let swalOptions2 = {
	position: "top-end",
	title: "This can a while",
	type: "error",
	width: 400,
	showConfirmButton: true,
	timer: 1000
};

Alert2.fireToast(swalOptions2);
                axios
                  .get(`http://localhost:54774/api/v2/analizer/analize/'${r}'`)
                  .then((res) => {
                      console.log(res.data.output);
                      let result = res.data.output.replace(`${r}`,'Analize complete.Possible hashes are');
		      let result2 = result.replace('Analyzing', '');
                      const Alert = require("electron-alert");

let swalOptions = {
	position: "center",
	title: result2,
	width: 400,
	type: "success",
	showConfirmButton: true,
	timer: 65000
};

Alert.fireToast(swalOptions);

                      
                  
                  })
                  .catch((err) => console.log(err));
              }
            })
            .catch(console.error);
     },
  },
  {
    label: "Dictionary",
    submenu: [
      {
        label: "View Words",
        click() {
          axios
            .get(`http://localhost:54774/api/v2/viewlist`)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));
        },
      },
      {
        label: "Add new",
        click() {
          prompt({
            title: "Add new word",
            label: "New Word:",
            value: "",
            inputAttrs: {
              type: "text",
              required: true,
            },
            type: "input",
          })
            .then((r) => {
              if (r === null || r === undefined || r.length === 0) {
                console.log("user cancelled");
              } else {
                axios
                  .get(`http://localhost:54774/api/v2/guess/${r}`)
                  .then((res) => {
                      console.log(res.data);
                      const Alert = require("electron-alert");

let swalOptions = {
	position: "top-end",
	title: "Word Added",
	type: "success",
	width: 400,
	showConfirmButton: true,
	timer: 5000
};

Alert.fireToast(swalOptions);

                      
                  
                  })
                  .catch((err) => console.log(err));
              }
            })
            .catch(console.error);
        },
      },
    ],
  },
  {
     label: "Help"
  }
];
