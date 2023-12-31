import './App.css';
import {useState} from 'react';
import Title from './Title';
import Button from './Button';
import Content from './Content';

let stage = 0;

function App() {

  //Application Constants
  let response = []
  const definitions = [
      "Gross monthly income refers to how much money an individual earns before deductions.", 
      "Credit Card payments refers to your average monthly credit card balance statement",
      "Car Payments refer to your average monthly costs towards paying off your car",
      "Student Loan Payments refer to your monthly payments towards your student debt",
      "Appraised Value refers to the value of the house you are looking to purchase",
      "Down Payment refers to the initial payment made when your house is bought on credit",
      "Loan Amount refers to the amount of money you are being loaned to purchase the house",
      "Monthly Mortage Payment refers to the monthly payments you will pay for the house",
      "Credit Score refers to a numerical rating representing the perceived ability of a person or organization to fulfill their financial commitments",
    ];
  const titleVals = ['Housing Eligibility Assistant', 'Data Input', 'Approved', 'Not Advised'];
  const buttonNameVals = ['Next', 'Submit', 'Return', 'Return'];
  const contentVals = [
      (<div id="stage1">
          <p>
            A handy tool for estimating you financial eligibility for purchancing a house
          </p>
      </div>),
      (<div id="stage2">
          <form action="" method="POST" id="data">
              
              <div>
                <label for="grossIncome" placeholder="$00.00"><abbr title={definitions[0]}>Gross Monthly Income</abbr></label>
                <span>$ <input type="text" id="grossIncome"/></span>
              </div>
              
            <div>              
                  <label for="ccPayment" placeholder="$00.00"><abbr title={definitions[1]}>Credit Card Payment</abbr></label>
                  <span>$ <input type="text" id="ccPayment"/></span>
              </div>
              <div>
                  <label for="carPayment" placeholder="$00.00"><abbr title={definitions[2]}>Car Payment</abbr></label>
                  <span>$ <input type="text" id="carPayment"/></span>
              </div>
              <div>
                  <label for="slPaymnet" placeholder="$00.00"><abbr title={definitions[3]}>Student Loan Payment</abbr></label>
                  <span>$ <input type="text" id="slPayment"/></span>
              </div>
              <div>
                  <label for="appValue" placeholder="$00.00"><abbr title={definitions[4]}>Appraised Value</abbr></label>
                  <span>$ <input type="text" id="appValue"/></span>
              </div>
              <div>
                  <label for="dPayment" placeholder="$00.00"><abbr title={definitions[5]}>Down Payment</abbr></label>
                  <span>$ <input type="text" id="dPayment"/></span>
              </div>
              <div>
                  <label for="loanAmount" placeholder="$00.00"><abbr title={definitions[6]}>Loan Amount</abbr></label>
                  <span>$ <input type="text" id="loanAmount"/></span>
              </div>
              <div>
                  <label for="mmPayment" placeholder="$00.00"><abbr title={definitions[7]}>Monthly Mortgage Payment</abbr></label>
                  <span>$ <input type="text" id="mmPayment"/></span>
              </div>
              <div>
                  <label for="creditScore" placeholder="$00.00"><abbr title={definitions[8]}>Credit Score</abbr></label>
                  <span><input type="text" id="creditScore"/></span>
              </div>
          </form>
      </div>),
      (<div id="stage3a">
          <h1>Congratulations, you are eligible to purchase a house</h1>
      </div>),
      (<div id="stage3d">
          <h2>Unfortunately, it is not recommended to purchase a house in your current conditions. However, here are some recommended next steps</h2>
          <p>{response}</p>
      </div>)];

  //Title of the page
  const [title, setTitle] = useState(titleVals[stage]);
 
  //Content of the page
  const [content, setContent] = useState((contentVals[stage]));

  //Name of the transition of the button
  const [buttonName, setButtonName] = useState(buttonNameVals[stage]);
  const callback = () => {

        stage++;

        if(stage > 2) {

          stage = 0;

        }

        if(stage === 2) {

            let el = document.getElementById('data');
            let data = [];

            for(let i = 0; i < 9; i++) {

                data[i] = el.children[i].children[1].children[0].value;

            }

            //send data here
            data = data.map((val) => {
                return Number(val);
            });

            let [gmi, ccp, cp, slp, av, dp, la, mmp, cs] = data;

            const LTV = la/av;

            if(LTV>0.80)
            {
              const PMI = 1+(0.01/12)
              mmp = av*PMI;
            }

            const DTI = (ccp+cp+slp)/gmi;
            const FEDTI = mmp/gmi;

            let creditTest = (cs>=640)
            let LTV_Test = (LTV<0.95);
            let DTI_Test = (DTI<=0.36);
            let FEDTI_Test = (FEDTI<=0.28);

            let eligible = false;

            if(creditTest&&LTV_Test&&DTI_Test&&FEDTI_Test)
            {
              eligible = true;
            }
            else
            {
              if(!creditTest)
              {
               response.push("Work on increasing your credit score"); 
              }
              if(!LTV_Test)
              {
                response.push("Lower the loan cost");
              }
              if(!DTI_Test)
              {
                response.push("Lower your debt-to-income ratio");
              }
              if(!FEDTI_Test)
              {
                response.push("Lower your mortgage-to-income ratio");
              }
            }

            if(eligible) { stage = 2; }
            else { stage = 3; }         

        } 

        for(let i = 0; i < response.length; i++) {

            response[i] += ', ';

        }
        

        setTitle(titleVals[stage]);
        setButtonName(buttonNameVals[stage]);
        setContent(contentVals[stage]);

  }

      

  return (
      <div className="app">
        <Title title={title} />
        <Content content={content} />
        <Button callback={callback} name={buttonName} />
      </div>
  );
}

export default App;
