import type { CollectionConfig } from 'payload'
import { ownedAccess, ownerField } from './access'

export const Transactions: CollectionConfig = {
  slug: 'transactions',
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
        if (category.type !== data.type) throw new Error('Tipe kategori harus sama dengan tipe transaksi.')
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
  admin: {
    defaultColumns: ['description', 'type', 'amount', 'date'],
    group: 'MoneyTrack',
    useAsTitle: 'description',
  },
  fields: [
    { name: 'description', type: 'text', required: true, maxLength: 120 },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Pemasukan', value: 'income' },
        { label: 'Pengeluaran', value: 'expense' },
      ],
    },
    { name: 'amount', type: 'number', required: true, min: 1 },
    { name: 'date', type: 'date', required: true },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      filterOptions: ({ user }) =>
        user?.collection === 'users' ? { owner: { equals: user.id } } : true,
    },
    { name: 'note', type: 'textarea', maxLength: 400 },
    ownerField,
  ],
}
