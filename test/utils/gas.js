import { mockServerClient } from 'mockserver-client'

class Gas {
  async clearExpectation(expectationId) {
    const client = mockServerClient(
      process.env.MOCKSERVER_HOST,
      process.env.MOCKSERVER_PORT
    )
    await client.clearById(expectationId)
  }

  async setStatusQueryResponse(referenceNumber, gasStatus) {
    const expectationId = `applications-${referenceNumber.toLowerCase()}-${gasStatus}-200`
    const client = mockServerClient(
      process.env.MOCKSERVER_HOST,
      process.env.MOCKSERVER_PORT
    )

    await client.mockAnyResponse({
      id: expectationId,
      priority: 999,
      httpRequest: {
        method: 'GET',
        path: `/grants/frps-private-beta/applications/${referenceNumber.toLowerCase()}/status`
      },
      httpResponse: {
        statusCode: 200,
        body: {
          type: 'JSON',
          json: {
            status: gasStatus
          }
        }
      }
    })

    return expectationId
  }
}

export default new Gas()
