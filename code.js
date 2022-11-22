//speech
var audioList = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,30,40,50,60,70,80,90,100,200,300,400,500,600,700,800,900,1000];
for (al = 0; al < audioList.length; al++) {
    let aud = document.createElement("audio");
    aud.id = audioList[al];
    aud.src = "Assets/Sounds/Speechs/"+audioList[al]+".mp3";
    document.getElementById("audHolder").appendChild(aud);
}
function playSpeech(src) {
    document.getElementById(src).play();
}
function stopSpeech(src) {
    document.getElementById(src).pause();
    document.getElementById(src).currentTime = 0;
}
function readOut(num) {
    let durOp;
    let extra = false;
    let extra2 = false;
    if (parseInt(num) > 1000) {
        let playNum = 0;
        function player() {
            if (playNum < num.length) {
                durOp = num[playNum];
                playSpeech(durOp);
                let intervalNum = (document.getElementById(durOp).duration) * 1000;
                setTimeout(function() {
                    stopSpeech(durOp);
                    playNum+=1;
                    player();
                }, intervalNum);
            }
        }
        player();
    } else {
        let playNum = 0;
        function player() {
            if (playNum < num.length) {
                if (parseInt(num) == 0) {
                    durOp = num[0]
                    playSpeech(durOp);
                } else if ((num.length - playNum) == 1) {
                    durOp = num[playNum]
                    playSpeech(durOp);
                } else if ((num.length - playNum) == 2) {
                    if ((num[playNum] + num[playNum+1]) > 20) {
                        if ((num[playNum] + num[playNum+1]) % 10 == 0) {
                            durOp = ((""+num[playNum])+(""+num[(playNum+1)]));
                            playSpeech(durOp);
                            extra = true;
                        } else {
                            durOp = ((""+num[playNum])+0)
                            playSpeech(durOp)
                        }
                    } else {
                        durOp = ((""+num[playNum])+(""+num[(playNum+1)]))
                        playSpeech(durOp)
                        extra = true;
                    }
                } else if ((num.length - playNum) == 3) {
                    if ((num[playNum] + num[playNum+1] + num[playNum+2]) % 100 == 0) {
                        durOp = ((""+num[playNum])+"00")
                        playSpeech(durOp)
                        extra2 = true;
                    }
                        durOp = ((""+num[playNum])+"00")
                        playSpeech(durOp)
                } else if (num == 1000) {
                    durOp = ((""+num[playNum])+"000")
                        playSpeech(durOp)
                        extra = true;
                        extra2 = true;
                }
                let intervalNum = (document.getElementById(durOp).duration - 0.275) * 1000;
                setTimeout(function() {
                    stopSpeech(durOp);
                    playNum+=1;
                    if (extra == true) {
                        playNum+=1;
                    }
                    if (extra2 == true) {
                        playNum+=2;
                    }
                    player();
                }, intervalNum);
            }
        }
        player();
    }
}
//setup
var home = document.getElementById("starting").innerHTML;
document.getElementById("screens").style.position = "absolute";
function setCenter() {
    let pxVal = ((parseInt(document.body.clientWidth) / 2) - (320 / 2))
    document.getElementById("screens").style.left = ((100 * pxVal) / document.body.offsetWidth) + "%";
}
setCenter();
//console.log(((document.getElementById("setting").clientWidth) - (document.getElementById("settingClose").offsetWidth)))
//document.getElementById("settingClose").style.left = ((document.getElementById("setting").clientWidth) - (document.getElementById("settingClose").offsetWidth)) + "px";
document.body.onresize = function() { 
    setCenter();
}
function getInt(str, matchNum) {
    var toNum = /\d+/g;
    var string = str;
    var matched = string.match(toNum);
    if (matched){
        return(matched[matchNum])
    }
}
function getLastLetter(string) {
    return(string[(string.length) - 1])
}
for (res = 0; res < document.body.getElementsByTagName("*").length; res++) {
    if ((getLastLetter(document.body.getElementsByTagName("*")[res].style.top )!= "%")) {
        document.body.getElementsByTagName("*")[res].style.top = ((getInt(document.body.getElementsByTagName("*")[res].style.top, 0) / 450) * 100)+"%";
    }
    /*if ((getLastLetter(document.body.getElementsByTagName("*")[res].style.left )!= "%")) {
        document.body.getElementsByTagName("*")[res].style.left = ((getInt(document.body.getElementsByTagName("*")[res].style.left, 0) / 320) * 100)+"%";
    }*/
}
setScreen("starting");
hidden("modes", true)
//Functions
function setScreen(scrnId) {
    for (i = 0; i < document.querySelectorAll(".scrn").length; i++) {
        if(document.getElementsByClassName("scrn")[i].id == scrnId) {
            document.getElementById(document.getElementsByClassName("scrn")[i].id).hidden = false;
        } else {
            document.getElementById(document.getElementsByClassName("scrn")[i].id).hidden = true;
        }
    }
}
function hidden(id, truefalse) {
    document.getElementById(id).hidden=truefalse;
}
function randomNumber(min, max) {
    return(Math.floor(Math.random() * (max - min + 1) + min) )
}
function setHTML(id, txt) {
    document.getElementById(id).innerHTML = txt;
}
function setText(id, txt) {
    document.getElementById(id).value = txt;
}
function getNumber(id) {
    return(parseInt(document.getElementById(id).value));
}
function getText(id) {
    return(document.getElementById(id).value);
}
function animation(id, animationName, duration) {
    document.getElementById(id).style.animationName=animationName;
    document.getElementById(id).style.animationDuration=duration
    document.getElementById(id).style.animationFillMode="forwards"
}
function warn(id, message) {
    document.getElementById(id).innerHTML = message;
    hidden(id, false)
    animation(id, "fadeIn", "500ms")
    setTimeout(function() {
        animation(id, "fadeOut", "500ms")
        setTimeout(function() {
            hidden(id, true)
        }, 500);
    }, 1000);
}
function rollDice() {
    var interval = setInterval(function() {
        diceNum = randomNumber(1, 6);
        for (d = 0; d < 6; d++) {
            if (document.getElementsByClassName("dice")[d].id == ("dice"+diceNum)) {
                hidden(document.getElementsByClassName("dice")[d].id, false);
            } else {
                hidden(document.getElementsByClassName("dice")[d].id, true);
            }
        }
    }, 100)
    setTimeout(function() {
        clearInterval(interval)
    }, 500)
}
function tossCoin() {
    var coinInterval = setInterval(function() {
        coinNum = randomNumber(1, 2);
        if (coinNum == 1) {
            hidden("coinHead", false)
            hidden("coinTail", true)
        } else {
            hidden("coinHead", true)
            hidden("coinTail", false)
        }
    }, 100)
    setTimeout(function() {
        clearInterval(coinInterval)
    }, 500)
}
function playSound(sound, vol) {
    var audio = new Audio("Assets/Sounds/"+sound);
    audio.volume=vol
    audio.play();
}
function getScreen() {
    for (cs = 0; cs < document.querySelectorAll(".scrn").length; cs++) {
        if(document.getElementById(document.getElementsByClassName("scrn")[cs].id).hidden == false) {
            return(document.getElementsByClassName("scrn")[cs].id)
        }
    }
}
function numberPickerNoRepeatCountRefresh() {
    document.getElementById("numberPickerNoRepeatListCount").innerHTML=numberNoRepeatNums.length+"/"+((parseInt(document.getElementById("max").value) - parseInt(document.getElementById("min").value)) + 1);
}
//Starting
document.onanimationend = function(animation) {
    if (animation.animationName) {
        hidden("go", false)
        hidden("credit", false)
    }
}
function start() {
    if (document.getElementById("sound").checked == true) {
        if (document.getElementById("sound").checked == true) {
            playSound("Click.wav", 1);            
        }
    }
    hidden("title", true)
    hidden("go", true)
    hidden("version", true)
    hidden("contacts", true)
    hidden("loading", false)
    setTimeout(function() {
        setScreen("numberPicker")
        hidden("modes", false)
        hidden("setting", false)
        animation("setting", "settingClose", "0ms")
    }, 500)
}
//Number Picker
var numberNoRepeatNums = [];
var numberRepeating = false;
document.getElementById("numberPickerNoRepeatListView").onclick = function() {
    document.getElementById("numberPickerNoRepeatList").hidden = false;
    document.getElementById("numberPickerNoRepeatListHolder").innerHTML = "";
    for (nr = 0; nr < numberNoRepeatNums.length; nr++) {
        var numberNoRepeatLists = document.createElement("div");
        numberNoRepeatLists.style.width="297.5px"
        numberNoRepeatLists.id="numberNoRepeatLists"+(nr+1);
        numberNoRepeatLists.readOnly=true;
        numberNoRepeatLists.style.textAlign="center";
        numberNoRepeatLists.style.backgroundColor="white";
        numberNoRepeatLists.style.borderRadius="100px";
        numberNoRepeatLists.style.borderStyle="solid";
        numberNoRepeatLists.style.borderWidth="1px";
        numberNoRepeatLists.innerHTML=(nr+1)+". "+numberNoRepeatNums[nr];
        document.getElementById("numberPickerNoRepeatListHolder").appendChild(numberNoRepeatLists);
    }
}
document.getElementById("numberPickerNoRepeatListClear").onclick = function() {
    numberNoRepeatNums = [];
    alert("No-repeat list have been cleared")
    numberPickerNoRepeatCountRefresh();
}
document.getElementById("pickBtn").onclick = function numPickBtn() {
    if (getText("min") != "" && getText("max") != "" && getNumber("min") <= getNumber("max") && getNumber("max") <= 99999999999999999999 && getNumber("min") <= 99999999999999999999) {
        var result = randomNumber(getNumber("min"), getNumber("max"))
        numberRepeating = false;
        for (numNoRep = 0; numNoRep < numberNoRepeatNums.length; numNoRep++) {
            if (numberNoRepeatNums[numNoRep] == result) {
                numberRepeating = true;
                numNoRep = numberNoRepeatNums.length;
            } else {
                numberRepeating = false;
            }
        }
        if (document.getElementById("numberPickerNoRepeat").checked == true) {
            if (numberNoRepeatNums.length >= ((parseInt(document.getElementById("max").value) - parseInt(document.getElementById("min").value)) + 1)) {
                numberNoRepeatNums = [];
                alert("No-repeat list have been cleared")
            }
        }
        if ((numberRepeating == false && document.getElementById("numberPickerNoRepeat").checked == true) || document.getElementById("numberPickerNoRepeat").checked == false) {
            if (document.getElementById("sound").checked == true) {
                if (document.getElementById("sound").checked == true) {
                    playSound("Bing.mp3", 0.25);
                }            
            }
            if (numberRepeating == false) {
                numberNoRepeatNums.push(result);
                numberPickerNoRepeatCountRefresh();
            }
            setHTML("result", result)
            if (document.getElementById("numberPickerReadout").checked == true) {
                setTimeout(function() {
                    readOut(""+result);
                }, 150)
            }
            hidden("warns", false);
            hidden("pickBtn", true);
            warn("warns", "Number Picked!")
            setTimeout(function() {
                hidden("pickBtn", false);
            }, 1500);
        } else if (numberRepeating == true && document.getElementById("numberPickerNoRepeat").checked == true) {
            numPickBtn();
        }
    } else if (getText("min") == "" || getText("max") == "") {
        window.navigator.vibrate(250);
        if (document.getElementById("sound").checked == true) {
            playSound("Buzzer.wav", 1);            
        }
        setHTML("result", "Error!")
        hidden("warns", false);
        hidden("pickBtn", true);
        warn("warns", "Input a value!")
        setTimeout(function() {
            hidden("pickBtn", false);
        }, 1500);
    } else if (getNumber("min") > getNumber("max")) {
        window.navigator.vibrate(250);
        if (document.getElementById("sound").checked == true) {
            playSound("Buzzer.wav", 1);            
        }
        setHTML("result", "Error!")
        hidden("warns", false);
        hidden("pickBtn", true);
        warn("warns", "Minimum value cannot be greater than Maximum value!")
        setTimeout(function() {
            hidden("pickBtn", false);
        }, 1500);
    } else if (getNumber("max") > 99999999999999999999 || getNumber("min") > 99999999999999999999) {
        window.navigator.vibrate(250);
        if (document.getElementById("sound").checked == true) {
            playSound("Buzzer.wav", 1);            
        }
        setHTML("result", "Error!")
        hidden("warns", false);
        hidden("pickBtn", true);
        warn("warns", "Number too large! (Only 20 digits allowed)")
        setTimeout(function() {
            hidden("pickBtn", false);
        }, 1500);
    }
}
document.getElementById("minClear").onclick = function() {
    setText("min", "")
    if (document.getElementById("sound").checked == true) {
        playSound("Click.wav", 1);            
    }
}
document.getElementById("maxClear").onclick = function() {
    setText("max", "")
    if (document.getElementById("sound").checked == true) {
        playSound("Click.wav", 1);            
    }
}
document.getElementById("min").onchange = function() {
    numberPickerNoRepeatCountRefresh();
}
document.getElementById("max").onchange = function() {
    numberPickerNoRepeatCountRefresh();
}
//Password Generator
document.getElementById("generateBtn").onclick = function() {
    if (getText("passwordLength") == "") {
        window.navigator.vibrate(250);
        if (document.getElementById("sound").checked == true) {
            playSound("Buzzer.wav", 1);            
        }
        setText("passwordGeneratorResult", "Error!")
        hidden("generateBtn", true);
        warn("warns", "Input a password length value!")
        setTimeout(function() {
            hidden("generateBtn", false);
        }, 1500);
    } else if (getNumber("passwordLength") <= 0) {
        window.navigator.vibrate(250);
        if (document.getElementById("sound").checked == true) {
            playSound("Buzzer.wav", 1);            
        }
        setText("passwordGeneratorResult", "Error!")
        hidden("generateBtn", true);
        warn("warns", "Invalid input!")
        setTimeout(function() {
            hidden("generateBtn", false);
        }, 1500);
    } else if (getNumber("passwordLength") > 15) {
        window.navigator.vibrate(250);
        if (document.getElementById("sound").checked == true) {
            playSound("Buzzer.wav", 1);            
        }
        setText("passwordGeneratorResult", "Error!")
        hidden("generateBtn", true);
        warn("warns", "Passwords cannot be more than 15 digits!")
        setTimeout(function() {
            hidden("generateBtn", false);
        }, 1500);
    } else {
        if (document.getElementById("sound").checked == true) {
            playSound("Bing.mp3", 0.25);            
        }
        hidden("warns", false);
        hidden("generateBtn", true);
        warn("warns", "Password Generated!")
        setTimeout(function() {
            hidden("generateBtn", false);
        }, 1500);
        var alphabetCaps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var alphabetSmall = "abcdefghijklmnopqrstuvwxyz";
        var numbers = "0123456789";
        var specialChars = "!@#$%^&*()"
        var chars = ""
        if (document.getElementById("alphabetCaps").checked == true) {
            chars += alphabetCaps;
        }
        if (document.getElementById("alphabetSmall").checked == true) {
            chars += alphabetSmall;
        }
        if (document.getElementById("numbers").checked == true) {
            chars += numbers;
        }
        if (document.getElementById("specialChars").checked == true) {
            chars += specialChars;
        }
        if (chars == "") {
            chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
            document.getElementById("alphabetCaps").checked = true;
            document.getElementById("alphabetSmall").checked = true;
            document.getElementById("numbers").checked = true;
            document.getElementById("specialChars").checked = true;
        }
        var passwordLength = getNumber("passwordLength");
        var password = "";
        for (p = 0; p < passwordLength; p++) {
            var randomNum = randomNumber(0, chars.length - 1)
            password += chars.substring(randomNum, randomNum+1);
        }
        setText("passwordGeneratorResult", password)
    }
}
document.getElementById("passwordCopy").onclick = function() {
    if (document.getElementById("sound").checked == true) {
        playSound("Click.wav", 1);            
    }
    var copyText = document.getElementById("passwordGeneratorResult");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    prompt("Copy the password from below:", copyText.value);
}
//dice
document.getElementById("rollBtn").onclick = function() {
    if (document.getElementById("sound").checked == true) {
        playSound("DiceThrow.mp3", 1);        
    }
    rollDice()
    hidden("warns", false);
    hidden("rollBtn", true);
    warn("warns", "Dice Rolled!")
    setTimeout(function() {
        hidden("rollBtn", false);
    }, 1500);
}
//coin
document.getElementById("tossBtn").onclick = function() {
    if (document.getElementById("sound").checked == true) {
        playSound("CoinToss.mp3", 1);    
    }
    var coinNum = randomNumber(1,2);
    warn("warns", "Coin Tossed!")
    hidden("tossBtn", true)
    tossCoin();
    setTimeout(function() {
        hidden("tossBtn", false)
    }, 1500)
}
//List
var listNum = 4;
document.getElementById("listAdd").onclick = function() {
    if (document.getElementById("sound").checked == true) {
        playSound("Click.wav", 1);            
    }
    var list = document.createElement("input");
    var listSpace = document.createElement("div");
    list.id = "list"+listNum;
    list.placeholder = "list "+listNum
    listSpace.style.height="10px";
    listSpace.id = "listSpace"+listNum
    list.id = "list"+listNum;
    document.getElementById("listHolder").appendChild(list);
    document.getElementById("listHolder").appendChild(listSpace);
    document.getElementById("list"+listNum).focus();
    document.getElementById("listDiv").scrollTop=document.getElementById("listDiv").scrollHeight;
    listNum += 1;
    hidden("listDel", false)
}
document.getElementById("listDel").onclick = function() {
    if (document.getElementById("sound").checked == true) {
        playSound("Click.wav", 1);            
    }
    listNum -= 1;
    document.getElementById("listHolder").removeChild(document.getElementById("list"+listNum));
    document.getElementById("listHolder").removeChild(document.getElementById("listSpace"+listNum));
    if (listNum <= 4) {
        hidden("listDel", true)
    }
}
document.getElementById("listPickBtn").onclick = function() {
    hidden("listResult", false);
    if (listNum > 1) {
        warn("warns", "Item Picked!");
        hidden("listPickBtn", true);
        setTimeout(function() {
            hidden("listPickBtn", false);
        }, 1500)
        var listRandomNum = randomNumber(1, (listNum - 1))
        if (document.getElementById("sound").checked == true) {
            playSound("Bing.mp3", 0.25);            
        }
        if (getText("list"+listRandomNum) != "") {
            setHTML("listResultTxt", "Result:"+"<br>"+getText("list"+listRandomNum))
        } else if (getText("list"+listRandomNum) == "") {
            setHTML("listResultTxt", "Result:"+"<br>List "+listRandomNum)
        }
    } else if (listNum <= 1) {
        window.navigator.vibrate(250);
        if (document.getElementById("sound").checked == true) {
            playSound("Buzzer.wav", 1);            
        };
        setHTML("listResultTxt", "Add atleast one item to the list!");
    }
}
document.getElementById("listResultClose").onclick = function() {
    if (document.getElementById("sound").checked == true) {
        playSound("Click.wav", 1);            
    }
    hidden("listResult", true);
}
//Role
var roleNum = 4;
var pickedRoles = []
document.getElementById("roleAdd").onclick = function() {
    document.getElementById("roleResetBtn").click();
    if (document.getElementById("sound").checked == true) {
        playSound("Click.wav", 1);            
    }
    hidden("roleResult", true);
    var role = document.createElement("input");
    var roleSpace = document.createElement("div");
    role.id = "role"+roleNum;
    role.placeholder = "Role "+roleNum
    roleSpace.style.height="10px";
    roleSpace.id = "roleSpace"+roleNum
    document.getElementById("roleHolder").appendChild(role);
    document.getElementById("roleHolder").appendChild(roleSpace);
    document.getElementById("role"+roleNum).focus();
    document.getElementById("roleDiv").scrollTop=document.getElementById("roleDiv").scrollHeight;
    roleNum += 1;
    hidden("roleDel", false)
    setHTML("rolePickedNum", pickedRoles.length+"/"+(roleNum - 1));
}
document.getElementById("roleDel").onclick = function() {
    document.getElementById("roleResetBtn").click();
    if (document.getElementById("sound").checked == true) {
        playSound("Click.wav", 1);            
    }
    hidden("roleResult", true);
    roleNum -= 1;
    document.getElementById("roleHolder").removeChild(document.getElementById("role"+roleNum));
    document.getElementById("roleHolder").removeChild(document.getElementById("roleSpace"+roleNum));
    if (roleNum <= 4) {
        hidden("roleDel", true)
    }
    setHTML("rolePickedNum", pickedRoles.length+"/"+(roleNum - 1));
}
document.getElementById("rolePickBtn").onclick = function() {
    hidden("roleResult", false);
    if (roleNum > 1) {
        var roleRandomNum = randomNumber(1, (roleNum - 1));
        let picked = false;
        let roleEmpty = false;
        for (let e = 1; e < roleNum; e++) {
            if (getText("role"+e) == "") {
                roleEmpty = true;
                e = roleNum;
            } else {
                roleEmpty = false;
            }
        }
        if (roleEmpty == false) {
            roleRandomNum = randomNumber(1, roleNum - 1);
            for (var r = 0; r < pickedRoles.length; r++) {
                if (getText("role"+roleRandomNum) == pickedRoles[r]) {
                    if (pickedRoles.length < (roleNum - 1)) {
                        r = -1;
                    }
                    roleRandomNum = randomNumber(1, (roleNum - 1));
                    picked = true;
                } else {
                    picked = false;
                }
            }
            var same = false;
            for (var s = 1; s < (roleNum); s++) {
                for (var a = 1; a < (roleNum); a++) {
                    if (s != a) {
                        if (getText("role"+s) == getText("role"+a)) {
                            same = true;
                            a = roleNum;
                            s = roleNum;
                            setHTML("roleResultTxt", "Some of the input contains same value!<br>You must edit some inputs!")
                            window.navigator.vibrate(250);
                            if (document.getElementById("sound").checked == true) {
                                playSound("Buzzer.wav", 1);            
                            }
                            hidden("roleResultTxt", false);
                        } else {
                            same = false;
                        }
                    }
                }
            }
            if (picked == false && same == false) {
                if (document.getElementById("sound").checked == true) {
                    playSound("Bing.mp3", 0.25);            
                }
                warn("warns", "Role Picked!");
                hidden("rolePickBtn", true);
                hidden("roleResetBtn", true);
                setTimeout(function() {
                    if (pickedRoles.length != (roleNum - 1)) {
                        hidden("rolePickBtn", false);   
                    }
                    hidden("roleResetBtn", false);
                }, 1500)
                pickedRoles.push(getText("role"+roleRandomNum))
                setHTML("roleResultTxt", "Result:"+"<br>"+getText("role"+roleRandomNum))
                setHTML("rolePickedNum", pickedRoles.length+"/"+(roleNum - 1));
                document.getElementById("roleResetBtn").style.left="160px";
                document.getElementById("rolePickBtn").style.left="60px";
                if (pickedRoles.length == (roleNum - 1)) {
                    setTimeout(function() {
                        hidden("rolePickBtn", true)
                        hidden("roleResetBtn", false);
                        hidden("roleHistoryView", false);
                    }, 1500)
                    document.getElementById("roleResetBtn").style.left="110px";
                    document.getElementById("rolePickBtn").style.left="110px";
                }
            }
        } else {
            if (document.getElementById("sound").checked == true) {
                playSound("Buzzer.wav", 1);            
            };
            window.navigator.vibrate(250);
            setHTML("roleResultTxt", "Fill up all the input fields!")
        }
    }
}
document.getElementById("roleResultClose").onclick = function() {
    if (document.getElementById("sound").checked == true) {
        playSound("Click.wav", 1);            
    }
    hidden("roleResult", true);
}
document.getElementById("roleResetBtn").onclick = function() {
    if (document.getElementById("sound").checked == true) {
        playSound("Click.wav", 1);            
    }
    pickedRoles = [];
    hidden("roleHistoryView", true);
    hidden("rolePickBtn", false);
    hidden("roleResetBtn", true);
    hidden("roleResult", true);
    setHTML("rolePickedNum", pickedRoles.length+"/"+(roleNum - 1));
    document.getElementById("roleResetBtn").style.left="110px";
    document.getElementById("rolePickBtn").style.left="110px";
}
document.getElementById("roleHistoryView").onclick = function() {
    if (document.getElementById("sound").checked == true) {
        playSound("Click.wav", 1);            
    }
    hidden("roleHistory", false);
    hidden("roleHistoryView", true);
    hidden("rolePickBtn", true);
    hidden("roleResetBtn", true);
    hidden("rolePickedNum", true);
    setHTML("roleHistoryHolder", "")
    for (h = 0; h < pickedRoles.length; h++) {
        var roleHistory = document.createElement("div");
        roleHistory.style.width="297.5px"
        roleHistory.id="roleHistory"+(h+1);
        roleHistory.readOnly=true;
        roleHistory.style.textAlign="center";
        roleHistory.style.backgroundColor="white";
        roleHistory.style.borderRadius="100px";
        roleHistory.style.borderStyle="solid";
        roleHistory.style.borderWidth="1px";
        roleHistory.innerHTML=(h+1)+". "+pickedRoles[h];
        document.getElementById("roleHistoryHolder").appendChild(roleHistory);
    }
}
document.getElementById("roleHistoryClose").onclick = function() {
    if (document.getElementById("sound").checked == true) {
        playSound("Click.wav", 1);            
    }
    hidden("roleHistory", true);
    hidden("roleHistoryView", false);
    hidden("rolePickBtn", false);
    hidden("roleResetBtn", false);
    hidden("rolePickedNum", false);
}
//Modes
document.getElementById("modes").oninput = function() {
    if (document.getElementById("sound").checked == true) {
        playSound("Click.wav", 1);            
    }
    if (getText("modes") == "Password Generator") {
        setScreen("passwordGenerator")      
    } else if (getText("modes") == "Number Picker") {
        setScreen("numberPicker")
    } else if (getText("modes") == "Dice") {
        setScreen("dice")
    } else if (getText("modes") == "Coin") {
        setScreen("coin")
    } else if (getText("modes") == "List") {
        setScreen("list")
    } else if (getText("modes") == "Role Picker") {
        setScreen("role")
    }
}
window.onbeforeunload = function (unload) {
    return ""
};
//Setting
document.getElementById("settingClose").onclick = function() {
    setTimeout(function() {
        animation("setting", "settingClose", "500ms")
    }, 1)
}
document.getElementById("setting").onclick = function() {
    if (document.getElementById("setting").style.width == "50px") {
        animation("setting", "settingOpen", "500ms")
    }
}
document.getElementById("settingTxt").onclick = function() {
    if (document.getElementById("setting").style.width == "50px") {
        animation("setting", "settingOpen", "500ms")
    }
}
document.getElementById("bgColor").oninput = function() {
    document.getElementById("screens").style.backgroundColor=document.getElementById("bgColor").value;
}
document.onclick = function(clicked) {
    if (getScreen() != "helpScrn") {
        if (document.getElementById(clicked.target.id).className != "setting") {
            animation("setting", "settingClose", "500ms")
        }
    } else {
        animation("setting", "settingClose", "0ms")
    }
}
//help
var prevScreen;
document.getElementById("help").onclick = function() {
    animation("setting", "settingClose", "500ms")
    setTimeout(function() {
        prevScreen = getScreen();
        setScreen("helpScrn")
        hidden("modes", true);
        hidden("setting", true)
    }, 500)
}
document.getElementById("helpReturn").onclick = function() {
    setTimeout(function() {
        setScreen(prevScreen);
    }, 1)
    hidden("modes", false);
    hidden("setting", false);
}
//home
document.getElementById("home").onclick = function() {
    document.getElementById('starting').innerHTML = home; 
    animation('setting', 'settingClose', '500ms');
    setTimeout(function() {
        prevScreen = getScreen();
        setScreen('starting');
        hidden('modes', true);
        hidden('setting', true);
    }, 500)
}