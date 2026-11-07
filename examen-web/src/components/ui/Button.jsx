const VARIANTS = {
    primary:'bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:outline-indigo-600',
    secondary:'bg-white text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50 focus-visible:outline-slate-400',
    danger:'bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-600'

};
export default function Button({variant='primary',className='',...props}){
    return(
        <button className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold
            shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2
            disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${className}`}
            {...props}/>
    );

}