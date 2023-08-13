// user.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { of } from 'rxjs';
import * as UserActions from './user.actions';
import { UserApiServiceService } from 'src/app/features/user/services/user-api.service.service';
import { User } from 'src/app/core/models/interface';

@Injectable()
export class UserEffects {
  loadUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserData),
      mergeMap(() =>
        this.userService.getUser().pipe(
          map(({ user }: { success: boolean; message: string; user: User }) =>
            UserActions.loadUserDataSuccess({ user })
          ),
          catchError(() => of())
        )
      )
    )
  );


  constructor(private actions$: Actions, private userService: UserApiServiceService) {}
}
