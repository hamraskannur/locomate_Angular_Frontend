// user-state.module.ts
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './user/user.reducer';
import { UserEffects } from './user/user.effects';
import { loadingReducer } from './loading/loading.reducer';

@NgModule({
  imports: [
    StoreModule.forRoot({ user: userReducer, loading: loadingReducer  }), 
    EffectsModule.forRoot([UserEffects]),
  ],
})
export class UserStateModule {}
