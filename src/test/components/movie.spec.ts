import { MovieDAO } from '../../api/components/movie/repository';
import { MovieRoutes } from '../../api/components/movie/routes';
import { UserDAO } from '../../api/components/user/repository';
import { useAuthService } from '../../api/services/auth';
import { middlewareMock, mockRouter } from '../helper';
import { MovieMockRepository } from '../mocks/movie/repository';
import { UserMockRepository } from '../mocks/user/repository';
/*
    Unfortunately due to such a tight schedule there was no time for unit test.
    Although, I wrote a definition of some possible tests to implement.
    TODO: Implement tests
*/

describe('Movie', () => {
    describe('routes', () => {

        const prefix = ':accountId/movies';
        const userDAO = new UserDAO(new UserMockRepository());
        const movieDAO = new MovieDAO(new MovieMockRepository());
        const movieRoutes = new MovieRoutes(prefix, movieDAO, userDAO);
        const authService = useAuthService(userDAO);

        let authSpy: jest.SpyInstance;
        let routeSpy: typeof jest;

        beforeEach(() => {
            routeSpy = jest.mock('express', () => {
                // eslint-disable-next-line no-unused-labels
                Router: () => mockRouter()
            });
            authSpy = jest.spyOn(authService, 'isAuthorized').mockReturnValue(middlewareMock());
        });

        afterEach(() => {
            routeSpy.clearAllMocks();
            authSpy.mockClear();
        });

        it('should create', () => {
            expect(movieRoutes).toBeDefined();
        });

        describe('getMovies', () => {
            it('should validate if use is authenticated', () => {
                // TODO
            });

            it('should fail if the parameter "accountId" is not defined', () => {
                // TODO
            });

            it('should fail if the parameter "accountId" is not numeric', () => {
                // TODO
            });

            it('should fail if the query "page" is zero', () => {
                // TODO
            });

            it('should fail if the query "page" is negative', () => {
                // TODO
            });

            it('should set the query "page" value as "1" if it is not defined', () => {
                // TODO
            });

            it('should fail if the query "limit" is negative', () => {
                // TODO
            });

            it('should set the query "limit" value as "50" if it is not defined', () => {
                // TODO
            });

            it('should validate if the user has access to resources from the requested "accountId"', () => {
                // TODO
            });
        });

        describe('getMovie', () => {
            it('should validate if use is authenticated', () => {
                // TODO
            });

            it('should fail if the parameter "accountId" is not defined', () => {
                // TODO
            });

            it('should fail if the parameter "accountId" is not numeric', () => {
                // TODO
            });

            it('should fail if the parameter "movieId" is not defined', () => {
                // TODO
            });

            it('should fail if the parameter "movieId" is not numeric', () => {
                // TODO
            });

            it('should validate if the user has access to resources from the requested "accountId"', () => {
                // TODO
            });

            it('should return 404 if the result is empty', () => {
                // TODO
            });
        });

        describe('createMovie', () => {
            it('should validate if use is authenticated', () => {
                // TODO
            });

            it('should fail if the parameter "accountId" is not defined', () => {
                // TODO
            });

            it('should fail if the parameter "accountId" is not numeric', () => {
                // TODO
            });

            it('should fail if the parameter "movieId" is not defined', () => {
                // TODO
            });

            it('should fail if the parameter "movieId" is not numeric', () => {
                // TODO
            });

            it('should validate if the user has access to resources from the requested "accountId"', () => {
                // TODO
            });

            it('should validate if the user has write access', () => {
                // TODO
            });

            it('should validate request body for creation', () => {
                // TODO
            });
        });

        describe('updateMovie', () => {
            it('should validate if use is authenticated', () => {
                // TODO
            });

            it('should fail if the parameter "accountId" is not defined', () => {
                // TODO
            });

            it('should fail if the parameter "accountId" is not numeric', () => {
                // TODO
            });

            it('should fail if the parameter "movieId" is not defined', () => {
                // TODO
            });

            it('should fail if the parameter "movieId" is not numeric', () => {
                // TODO
            });

            it('should validate if the user has access to resources from the requested "accountId"', () => {
                // TODO
            });

            it('should validate if the user has write access', () => {
                // TODO
            });

            it('should validate request body for update', () => {
                // TODO
            });

            it('should return 404 if the result is empty', () => {
                // TODO
            });
        });

        describe('deleteMovie', () => {
            it('should validate if use is authenticated', () => {
                // TODO
            });

            it('should fail if the parameter "accountId" is not defined', () => {
                // TODO
            });

            it('should fail if the parameter "accountId" is not numeric', () => {
                // TODO
            });

            it('should fail if the parameter "movieId" is not defined', () => {
                // TODO
            });

            it('should fail if the parameter "movieId" is not numeric', () => {
                // TODO
            });

            it('should validate if the user has access to resources from the requested "accountId"', () => {
                // TODO
            });

            it('should validate if the user has write access', () => {
                // TODO
            });

            it('should return 404 if the result is empty', () => {
                // TODO
            });
        });
    });

    describe('controller', () => {
        describe('getMovies', () => {
            it('should get list from Movie DAO with the parameters sent on request', () => {
                // TODO
            });

            it('should send the movies list response from Movie DAO as a json response', () => {
                // TODO
            });
        });

        describe('getMovie', () => {
            it('should get a movie from Movie DAO with the parameters sent on request', () => {
                // TODO
            });

            it('should send the movie response from Movie DAO as a json response', () => {
                // TODO
            });
        });


        describe('createMovie', () => {
            it('should create a movie from Movie DAO with the parameters sent on request', () => {
                // TODO
            });

            it('should send the create movie response from Movie DAO as a json response', () => {
                // TODO
            });
        });


        describe('updateMovie', () => {
            it('should update a movie from Movie DAO with the parameters sent on request', () => {
                // TODO
            });

            it('should send the update movie response from Movie DAO as a json response', () => {
                // TODO
            });
        });


        describe('deleteMovie', () => {
            it('should delete a movie from Movie DAO with the parameters sent on request', () => {
                // TODO
            });

            it('should send the delete movie response from Movie DAO as a json response', () => {
                // TODO
            });
        });
    });

    describe('repository', () => {
        describe('getList', () => {
            it('should query repo for the movies list and count', () => {
                // TODO
            });

            it('should return the movies list', () => {
                // TODO
            });
        });

        describe('get', () => {
            it('should query repo for the movie', () => {
                // TODO
            });

            it('should return the found movie', () => {
                // TODO
            });

            it('should return "null" if the movie was not found', () => {
                // TODO
            });
        });

        describe('create', () => {
            it('should query repo to save the new movie', () => {
                // TODO
            });

            it('should return the added movie', () => {
                // TODO
            });
        });

        describe('update', () => {
            it('should query repo to check if the movie exists', () => {
                // TODO
            });

            it('should return "null" if no movie was found', () => {
                // TODO
            });

            it('should query repo to update the existing movie with the new changes', () => {
                // TODO
            });

            it('should return the updated movie', () => {
                // TODO
            });
        });

        describe('delete', () => {
            it('should query repo to check if the movie exists', () => {
                // TODO
            });

            it('should return "null" if no movie was found', () => {
                // TODO
            });

            it('should query repo to delete the existing movie', () => {
                // TODO
            });

            it('should return the null if no movie was deleted', () => {
                // TODO
            });

            it('should return a message if the movie was deleted', () => {
                // TODO
            });
        });
    });
});