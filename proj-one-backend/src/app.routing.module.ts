import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { UserModule } from './api/user/user.module';

export const ROUTES = [
  {
    path: 'api/v1',
    children: [
      {
        path: 'user',
        module: UserModule,
      },
    ],
  },
];

@Module({
  imports: [RouterModule.register(ROUTES), UserModule],
})
export class AppRoutingModule {}
