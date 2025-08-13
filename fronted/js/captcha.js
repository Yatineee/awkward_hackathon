// captcha.js — optional “impossible captcha” placeholder
import { toast } from './ui.js';

export function runImpossibleCaptcha(){
  return new Promise((_, reject)=>{
    setTimeout(()=>{
      toast('Captcha expired. Please try again.');
      reject(new Error('captcha_failed'));
    }, 900);
  });
}