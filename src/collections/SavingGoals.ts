import type { CollectionConfig } from 'payload'
import { ownedAccess, ownerField } from './access'

export const SavingGoals: CollectionConfig = {
  slug: 'saving-goals',
  access: {
    create: ({ req }) => req.user?.collection === 'users',
    delete: ownedAccess,
    read: ownedAccess,
    update: ownedAccess,
  },
  admin: { group: 'MoneyTrack', useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', required: true, maxLength: 80 },
    { name: 'targetAmount', type: 'number', required: true, min: 1 },
    { name: 'currentAmount', type: 'number', required: true, min: 0, defaultValue: 0 },
    { name: 'targetDate', type: 'date', required: true },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Aktif', value: 'active' },
        { label: 'Selesai', value: 'completed' },
        { label: 'Dijeda', value: 'paused' },
      ],
    },
    ownerField,
  ],
}
