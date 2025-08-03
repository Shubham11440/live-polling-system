const PollResults = ({ poll }) => {
  // Calculate total votes by checking the length of all name arrays
  const totalVotes = Object.values(poll.responses || {}).flat().length

  return (
    <div>
      <h2 className="text-3xl lg:text-4xl font-extrabold mb-8">
        {poll.question}
      </h2>
      <div className="space-y-4">
        {poll.options.map((option, index) => {
          const voters = poll.responses[index] || []
          const voteCount = voters.length
          const percentage =
            totalVotes > 0 ? ((voteCount / totalVotes) * 100).toFixed(1) : 0

          return (
            <div key={index} className="bg-gray-700 rounded-lg p-2 text-left">
              <div className="relative h-10 flex items-center">
                <div
                  className="absolute top-0 left-0 h-full bg-blue-600 rounded-md transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                ></div>
                <div className="relative w-full flex justify-between items-center px-4">
                  <span className="font-bold text-white">{option}</span>
                  <span className="font-semibold text-white">
                    {voteCount} votes ({percentage}%)
                  </span>
                </div>
              </div>
              {voters.length > 0 && (
                <div className="px-4 py-2 text-xs text-gray-300 border-t border-gray-600 mt-2">
                  <span className="font-semibold">Voted by:</span>{' '}
                  {voters.join(', ')}
                </div>
              )}
            </div>
          )
        })}
      </div>
      <p className="text-right mt-4 font-bold text-gray-300">
        Total Votes: {totalVotes}
      </p>
    </div>
  )
}

export default PollResults
