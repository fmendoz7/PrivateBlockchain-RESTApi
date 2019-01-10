'use strict';

// >>> CRITERIA #1: Use hapi dependency <<< 
const blockchain = require('./blockchain.js');
var BlockArchetype = require('./blockArchetype.js');
const boomDependency = require('boom');
const hapiDependency = require('hapi');

// >>> CRITERIA #2: Run port 8000 <<< 
// Server creation 
const server = hapiDependency.server({
    host: 'localhost',
    port: 8000
});
//----------------------------------------------------------------
var pointHandle =
{
    // >>> CRITERIA #3: GET Block Endpoint <<< 
    // curl http://localhost:8000/block/1
    get: async function (request, reply)
    {
        console.log('GET block. BLOCK_HEIGHT: ' + request.params.BLOCK_HEIGHT);
        // Validate if BLOCK_HEIGHT is a number
        if (isNaN(request.params.BLOCK_HEIGHT)) {
            // Bad Request
            let badBlockHeight = boomDependency.badRequest('Please Pass A Valid Block Height');
            return badBlockHeight;
        }

        try {
            // Get block and return it
            return await blockchain.getBlock(request.params.BLOCK_HEIGHT);
        }

        catch (err) {
            console.log(err);
            if (isBoom(err)) {
                // Not Found
                return err;
            }

            else {
                // Error
                // (!!!) nA3: var store
                let badImpGet = boomDependency.badImplementation('FAILURE: Error Occurred');
                return badImpGet;
            }
        }

        finally {
            console.log('>> STEPCHECK: get endpoint.');
        }
    },

    // >>> CRITERIA #4: POST Block Endpoint <<< 
    // curl http://localhost:8000/block -X POST -H 'Content-Type: application/json' -d '{"body":"Block Body Contents"}'
    post: async function (request, reply)
    {
        console.log('POST block. Request: ' + JSON.stringify(request.payload));
        if (!request.payload.hasOwnProperty('body')) {
            // Bad Request
            // (!!!) nA3: var store
            let noBodyPost = boomDependency.badRequest('Please Pass body Into Data Payload');
            return noBodyPost;
        }

        try {
            // Get body
            const body = request.payload.body;

            // Add block
            let block = await blockchain.addBlock(new BlockArchetype(body));

            // Return block
            return reply.response(block).code(201);
        }

        catch (err) {
            console.log(err);

            // Error
            // (!!!) nA3: var store
            let badImpPost = boomDependency.badImplementation('FAILURE: Error Occurred');
            return badImpPost;
        }

        finally {
            console.log('>> STEPCHECK: post endpoint.');
        }
    }
}
//----------------------------------------------------------------
server.route([
    // >>> CRITERIA #3: GET block endpoint <<<
    {
        path: '/block/{BLOCK_HEIGHT}',
        method: 'GET',
        handler: pointHandle.get
    },

    // >>> CRITERIA #4: POST block endpoint <<<
    {
        path: '/block',
        method: 'POST',
        handler: pointHandle.post
    }
]);

const start = async () => {
    try {
        await server.start();
        console.log('Server running at: ' + server.info.uri);
    }

    catch (err) {
        console.log('Error while starting server: ', err);
    }

    finally {
        console.log('>> STEPCHECK: start function.');
    }
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

// Start the server
start();