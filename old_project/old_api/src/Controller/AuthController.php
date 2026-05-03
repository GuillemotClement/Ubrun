<?php

namespace App\Controller;

use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\ConstraintViolationListInterface;

final class AuthController extends AbstractController
{
  #[Route('/auth', name: 'app_auth')]
  public function index(): Response
  {
    return $this->render('auth/index.html.twig', [
      'controller_name' => 'AuthController',
    ]);
  }

  #[Route('/auth/register', name: 'api_register', methods: ['POST'])]
  public function register(
    Request $request,
    ValidatorInterface $validator,
    UserPasswordHasherInterface $hasher,
    EntityManagerInterface $em
  ): JsonResponse {
    // récupération des données issue du body de la request
    $data = json_decode($request->getContent(), true);

    // check si on as bien récupérées les données
    if (!$data) {
      return $this->json([
        'errors' => 'Invalid JSON',
      ], Response::HTTP_BAD_REQUEST);
    }

    // mappage des données reçu dans l'user
    $user = new User();
    $user->setEmail($data['email'] ?? '');
    $user->setPassword($data['password'] ?? '');
    $user->setRoles(['ROLE_USER']);


    // validation des données
    // warning Intelephense
    /** @var ConstraintViolationListInterface $errors */
    $errors = $validator->validate($user);
    if (count($errors) > 0) {
      $errorsMessages = [];
      foreach ($errors as $error) {
        $errorsMessages[$error->getPropertyPath()] = $error->getMessage();
      }

      return $this->json([
        'errors' => $errorsMessages,
      ], Response::HTTP_BAD_REQUEST);
    }

    // hashage du password
    $hashedPassword = $hasher->hashPassword(
      $user,
      $data['password']
    );
    $user->setPassword($hashedPassword);

    // enregistrement de la nouvelle valeur
    $em->persist($user);
    $em->flush();

    return $this->json([
      'message' => 'User registered',
    ], Response::HTTP_CREATED);
  }

  // #[Route('/auth/login', name: 'api_login', methods: ['POST'])]
  // public function login(
  //   Request $request,
  //   UserRepository $userRepository,
  //   UserPasswordHasherInterface $hasher,
  // ): JsonResponse {
  //   $data = json_decode($request->getContent(), true);

  //   if (!$data) {
  //     return $this->json([
  //       'errors' => 'Invalid JSON',
  //     ], Response::HTTP_BAD_REQUEST);
  //   }

  //   $userDB = $userRepository->findBy([
  //     'email' => $data['email'],
  //   ]);

  //   if (!$userDB) {
  //     return $this->json([
  //       'errors' => 'Credential not valid',
  //     ], Response::HTTP_UNAUTHORIZED);
  //   }

  //   $isValidPassword = $hasher->



  // }
}


// curl -X POST https://localhost:8000/api/auth/login -H "Content-Type: application/json" -d '{"email":"user@mail.com", "password":"12345678"}'
// curl -X POST https://localhost:8000/auth/register -H "Content-Type: application/json" -d '{"email":"user@mail.com", "password":"12345678"}'
