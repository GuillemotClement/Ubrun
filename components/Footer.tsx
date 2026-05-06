import NavLink from './NavLink';
import { Button } from './ui/button';

export default function Footer() {
  return (
    <footer className="border-t py-2 px-4 flex flex-col gap-y-2 sm:flex-row justify-between">
      <p className='text-center'>
        Copyright &copy; 2026 -{' '}
        <a href="https://github.com/GuillemotClement" className="hover:underline text-blue-600">
          Clément GUILLEMOT
        </a>
      </p>
      <p className="italic text-center text-xs">
        L&apos;application est en version beta et est suceptible d&apos;évoluer rapidement.
      </p>
      <Button>
        <NavLink href="">Contact</NavLink>
      </Button>
    </footer>
  );
}
