import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Shield, Scroll, Sword } from 'lucide-react';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = isLogin
        ? await signIn(email, password)
        : await signUp(email, password);

      if (error) {
        toast({
          title: 'Erro',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        if (!isLogin) {
          toast({
            title: 'Conta criada!',
            description: 'Você já pode fazer login.',
          });
          setIsLogin(true);
        } else {
          navigate('/characters');
        }
      }
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Algo deu errado. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Title */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center gap-4 mb-4">
            <Shield className="w-10 h-10 text-primary" />
            <Sword className="w-10 h-10 text-primary" />
            <Scroll className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-display text-primary mb-2">
            Grimório de Fichas
          </h1>
          <p className="text-muted-foreground">
            Sistema de Criação de Personagens de RPG
          </p>
        </div>

        {/* Auth Card */}
        <div className="rpg-card p-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-2xl font-display text-center mb-6">
            {isLogin ? 'Entrar' : 'Criar Conta'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-display text-muted-foreground mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rpg-input w-full"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-display text-muted-foreground mb-1">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rpg-input w-full"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="rpg-button-primary w-full text-lg py-3 disabled:opacity-50"
            >
              {loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Criar Conta'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:text-gold-light transition-colors"
            >
              {isLogin
                ? 'Não tem conta? Criar uma'
                : 'Já tem conta? Fazer login'}
            </button>
          </div>
        </div>

        <p className="text-center text-muted-foreground text-sm mt-6">
          Crie e gerencie suas fichas de personagem com facilidade
        </p>
      </div>
    </div>
  );
};

export default Auth;
