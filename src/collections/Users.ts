import { JWTAuthentication, type CollectionConfig } from 'payload'
import { adminFieldAccess, userSelfAccess } from './access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    strategies: [
      {
        name: 'moneytrack-app-jwt',
        authenticate: JWTAuthentication,
      },
    ],
    tokenExpiration: 7200,
    useSessions: false,
  },
  access: {
    create: () => true,
    delete: userSelfAccess,
    read: userSelfAccess,
    update: userSelfAccess,
  },
  admin: {
    group: 'MoneyTrack',
    hidden: true,
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      maxLength: 80,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'user',
      options: [
        { label: 'User', value: 'user' },
        { label: 'Admin', value: 'admin' },
      ],
      access: {
        create: adminFieldAccess,
        update: adminFieldAccess,
      },
    },
    {
      name: 'currency',
      type: 'select',
      required: true,
      defaultValue: 'IDR',
      options: ['IDR', 'USD', 'SGD'],
    },
  ],
  versions: false,
}
