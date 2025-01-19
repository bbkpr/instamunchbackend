// src/graphql/resolvers/auth.resolvers.ts
import { Resolvers } from '../../../generated/graphql';
import { AuthService } from '../../auth/authService';
import { InstaMunchContext } from '../context';
import { adaptUser } from '../../adapters/model.adapters';

export const authResolvers: Partial<Resolvers<InstaMunchContext>> = {
  Query: {
    async me(_, __, { user }) {
      return user || null;
    }
  },
  Mutation: {
    async login(_, { input: { email, password } }) {
      const user = await AuthService.validateUser(email, password);
      try {
        const adaptedUser = adaptUser(user!);
        if (!adaptedUser) {
          return {
            code: '401',
            success: false,
            message: 'Invalid credentials',
            permissionDenied: true
          };
        }

        const token = AuthService.generateToken(user!);

        return {
          code: '200',
          success: true,
          message: 'Login successful',
          permissionDenied: false,
          token,
          user: adaptedUser
        };
      } catch (e) {
        return {
          code: '500',
          success: false,
          message: 'Internal server error',
          permissionDenied: false
        };
      }
    }
  }
};