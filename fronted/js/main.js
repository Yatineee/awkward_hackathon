import { $, toast } from './ui.js';
import { enableCometoadMutation, fakeSignIn } from './prank.js';
// import { runImpossibleCaptcha } from './captcha.js'; // hook later if needed

const card = $('#card');
const btnContinue = $('#btnContinue');
const email = $('#email');
const helper = document.getElementById('helper'); // optional

let step = 'email';

btnContinue?.addEventListener('click', async ()=>{
  if(step === 'email'){
    if(!email.value){ toast('Please enter your email'); return; }
    step = 'password';
    card?.setAttribute('data-step','password');
    btnContinue.textContent = 'Continue';
    enableCometoadMutation(btnContinue, helper);
    toast('Now enter your password');
  } else {
    // await runImpossibleCaptcha().catch(()=>{});
    fakeSignIn();
  }
});

// Optional: swap hero via ?img=...
const params = new URLSearchParams(location.search);
const imgUrl = params.get('img');
if(imgUrl){
  const hero = document.getElementById('hero');
  if(hero) hero.src = imgUrl;
}