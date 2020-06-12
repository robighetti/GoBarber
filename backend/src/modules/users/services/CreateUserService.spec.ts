import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserRepository = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUserRepository.execute({
      name: 'Rodrigo Bighetti',
      email: 'robighetti@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with exists email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserRepository = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await createUserRepository.execute({
      name: 'Rodrigo Bighetti',
      email: 'robighetti@gmail.com',
      password: '123456',
    });

    await expect(
      createUserRepository.execute({
        name: 'Rodrigo Bighetti',
        email: 'robighetti@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
