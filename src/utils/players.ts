import { bold, green, yellow } from 'console-log-colors';
import type { User } from '../../../src/types/user.type';

const sortBy = (players: User[]) => {
  return players.sort((a, b) => b.likes - a.likes);
};

const isChampion = (users: User[] | undefined, p: User) => {
  if (!users) return;
  const sortByLikes = sortBy(users);
  if (!sortByLikes[0] || !p) return false;
  return sortByLikes[0].id === p.id;
};

const forfait = (sortByLikes: User[]) => {
  return sortByLikes.filter((p) => p.game.forfait);
};

const showPlayers = (
  players: User[],
  message: string,
  rankPlus: number = 1,
  users?: User[]
) => {
  players.forEach((t, i) => {
    const champion = () => {
      if (!users) false;
      return isChampion(users, t);
    };
    const rank = i + rankPlus;
    const qqc = t.genre === 'female' ? 'e' : '';
    console.log(
      `${rank}.`,
      bold(green(t.name)),
      `${!t.game.forfait ? 'a gagné' : 'est forfait'}${
        !t.game.forfait ? qqc : ''
      } par`,
      yellow(t.likes),
      `likes. ${message}. ${champion() ? '(1st💫)' : ''}`
    );
  });
};

export { forfait, isChampion, showPlayers, sortBy };
