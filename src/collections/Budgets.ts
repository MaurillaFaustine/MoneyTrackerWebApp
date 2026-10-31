import type { CollectionConfig } from 'payload'
import { ownedAccess, ownerField } from './access'

export const Budgets: CollectionConfig = {
  slug: 'budgets',
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        const categoryId = typeof data.category === 'object' ? data.category?.id : data.category
        if (!categoryId) throw new Error('Kategori wajib dipilih.')
        const category = await req.payload.findByID({
          collection: 'categories',
          id: categoryId,
          req,
          overrideAccess: false,
        })
        if (category.type !== 'expense') throw new Error('Anggaran hanya dapat memakai kategori pengeluaran.')
        return data
      },
    ],
  },
  access: {
    create: ({ req }) => req.user?.collection === 'users',
    delete: ownedAccess,
    read: ownedAccess,
    update: ownedAccess,
  },
  admin: { group: 'MoneyTrack', useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', required: true, maxLength: 80 },
    { name: 'amount', type: 'number', required: true, min: 1 },
    {
      name: 'period',
      type: 'select',
      required: true,
      defaultValue: 'monthly',
      options: [
        { label: 'Bulanan', value: 'monthly' },
        { label: 'Tahunan', value: 'yearly' },
      ],
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      filterOptions: ({ user }) =>
        user?.collection === 'users' ? { owner: { equals: user.id } } : true,
    },
    { name: 'startDate', type: 'date', required: true },
    ownerField,
  ],
}
