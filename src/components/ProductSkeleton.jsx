export default function ProductSkeleton({ count = 8 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
          <div className="bg-gray-100 aspect-square" />
          <div className="p-3 space-y-2">
            <div className="h-3 bg-gray-100 rounded-full w-1/3" />
            <div className="h-4 bg-gray-100 rounded-full w-4/5" />
            <div className="h-4 bg-gray-100 rounded-full w-3/5" />
            <div className="h-3 bg-gray-100 rounded-full w-1/4" />
            <div className="h-8 bg-gray-100 rounded-full mt-3" />
          </div>
        </div>
      ))}
    </>
  )
}
