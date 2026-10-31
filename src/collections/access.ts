import type { Access, FieldAccess } from 'payload'

export const isCMSAdmin = (user: any) => user?.collection === 'admins'
export const isAppUser = (user: any) => user?.collection === 'users'
export const isAppAdmin = (user: any) => isAppUser(user) && user?.role === 'admin'

export const ownedAccess: Access = ({ req }) => {
  if (isCMSAdmin(req.user) || isAppAdmin(req.user)) return true
  if (!isAppUser(req.user)) return false
  const user = req.user!
  return { owner: { equals: user.id } }
}

export const userSelfAccess: Access = ({ req }) => {
  if (isCMSAdmin(req.user) || isAppAdmin(req.user)) return true
  if (!isAppUser(req.user)) return false
  const user = req.user!
  return { id: { equals: user.id } }
}

export const adminFieldAccess: FieldAccess = ({ req }) =>
  isCMSAdmin(req.user) || isAppAdmin(req.user)

export const ownerField = {
  name: 'owner',
  type: 'relationship' as const,
  relationTo: 'users' as const,
  required: true,
  index: true,
  admin: { position: 'sidebar' as const, readOnly: true },
  access: {
    create: () => false,
    update: () => false,
  },
  hooks: {
    beforeChange: [
      ({ req, value }: any) => {
        if (isAppUser(req.user)) return req.user.id
        return value
      },
    ],
  },
}
