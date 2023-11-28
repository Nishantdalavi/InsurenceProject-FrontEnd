import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let _router = inject(Router)
  let isLoggedin = localStorage.getItem("isLoggedin");
  if(isLoggedin=='false'){
    alert("Not authenticated user")
    _router.navigate(['/admin/login'])
    return false;
    

  }
 
  return true;
};
