import type { CollectionConfig } from 'payload'
import { ownedAccess, ownerField } from './access'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: ({ req }) => req.user?.collection === 'users',
    delete: ownedAccess,
    read: ownedAccess,
    update: ownedAccess,
  },
  admin: { group: 'MoneyTrack', useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', required: true, maxLength: 60 },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Pemasukan', value: 'income' },
        { label: 'Pengeluaran', value: 'expense' },
      ],
    },
    {
      name: 'color',
      type: 'select',
      required: true,
      defaultValue: 'sage',
      options: ['sage', 'violet', 'orange', 'blue', 'pink'],
    },
    ownerField,
  ],
}
